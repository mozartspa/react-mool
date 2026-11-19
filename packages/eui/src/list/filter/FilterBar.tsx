import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexGroupProps,
  EuiFlexItem,
  EuiSelectableOption,
  EuiShowFor,
  useEuiTheme,
} from "@elastic/eui"
import { FormValues, useForm } from "@mozartspa/mobx-form"
import get from "dlv"
import {
  useAddFilter,
  useFilterOperators,
  useResource,
  useStorage,
  useTranslate,
} from "@react-mool/core"
import { autorun } from "mobx"
import { observer } from "mobx-react-lite"
import isEqual from "react-fast-compare"
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useFreshRef } from "rooks"
import { humanize } from "../../helpers/humanize"
import { t } from "../../i18n"
import { FilterBaseProps } from "./Filter"
import { FilterBarButton } from "./FilterBarButton"
import { buildListFilter, isEmptyFilterValue, TransformWhere } from "./listFilter"

function removeUnusedFilterValues(values: any, filterNames: string[]) {
  // Array is not supported
  if (Array.isArray(values)) {
    return values
  }

  let nextValues = { ...values }
  let changed = false

  Object.keys(values).forEach((key) => {
    const keyWithDot = `${key}.`
    const isUsed = filterNames.some((name) => name === key || name.startsWith(keyWithDot))

    if (!isUsed) {
      delete nextValues[key]
      changed = true
    }
  })

  return changed ? nextValues : values
}

function getFilterNames(filters: React.ReactElement<FilterBaseProps>[]) {
  return filters.map((f) => f.props.name).filter((name) => name != null)
}

/**
 * `TValues` are the values of the filters, `TFilter` the list filter they give.
 */
export type FilterBarProps<TValues extends FormValues = any, TFilter = any> = {
  /** Values of the filters when there are no restored ones. Values without a filter are ignored. */
  initialValues?: TValues
  /**
   * Changes the list filter given by the filters, eg. to add conditions that
   * no filter gives. It receives `{}` when no filter has a value. To add conditions,
   * `andFilters(operators, [where, condition])` (from the context) works also when the
   * data provider has no filter operators.
   */
  transformWhere?: TransformWhere<TFilter>
  /**
   * The list filter is the `and` of the conditions of the filters with a value.
   * A filter gives its condition with `toWhere`, otherwise by its `name`.
   */
  filters: React.ReactElement<FilterBaseProps>[]
  /** Restores the values of the filters, and the visible ones, from the last time. */
  restoreFromLast?: boolean
  /**
   * Prefix of the storage key, instead of the resource.
   * The key is `${restoreKey}-filterbar-v${restoreKeyVersion}`.
   */
  restoreKey?: string
  /**
   * Version of the stored values: increase it when the filters change in a way that
   * makes the stored values wrong (eg. a filter renamed, or with a different value),
   * so that the values stored before are ignored.
   * @default 1
   */
  restoreKeyVersion?: number
  restoreStorage?: Storage
  /** Called when the list filter changes */
  onChange?: (filter: TFilter) => void
  flexGroupProps?: EuiFlexGroupProps
  children?: ReactNode
  /**
   * If true, the filter list will be searchable.
   * @default undefined
   */
  searchable?: boolean
  /**
   * If set, the filter list will be searchable only when the number of filters is greater than this value.
   * This is useful to avoid showing a search input when there are few filters.
   * @default 7
   */
  searchableWhenMoreThan?: number
  /**
   * If true, the filter list will be sorted.
   * @default true
   */
  sorted?: boolean
}

function FilterBarComp<TValues extends FormValues, TFilter = any>(
  props: FilterBarProps<TValues, TFilter>
) {
  const {
    filters: oFilters,
    restoreFromLast,
    restoreKey,
    restoreKeyVersion = 1,
    restoreStorage,
    onChange,
    flexGroupProps,
    children,
    sorted = true,
    searchableWhenMoreThan = 7,
  } = props

  const translate = useTranslate()
  const resource = useResource()
  const operators = useFilterOperators<TFilter>(resource)
  const { euiTheme } = useEuiTheme()

  // Own suffix: the list may get the same `restoreKey`
  const storage = useStorage(
    `${restoreKey ?? resource}-filterbar-v${restoreKeyVersion}`,
    {
      enabled: restoreFromLast,
      storage: restoreStorage,
    }
  )

  // Form values to list filter: see `buildListFilter`.
  const buildFilter = (values: TValues) =>
    buildListFilter({
      values,
      filters: oFilters,
      transformWhere: props.transformWhere,
      operators,
    })
  const buildFilterRef = useFreshRef(buildFilter)

  // Restored values that give no list filter (eg. stored when building it threw, or with
  // filters changed since then) are dropped, otherwise the page would throw on every mount.
  const initialValues = useMemo(() => {
    const restored = storage.getValue("filterValues", undefined as TValues | undefined)
    if (restored === undefined) {
      return props.initialValues
    }
    try {
      buildFilter(restored)
      return restored
    } catch {
      return props.initialValues
    }
  }, [])
  const initialVisibleFilters = useMemo(
    () => storage.getValue("visibleFilters", [] as string[]),
    []
  )

  // Error building the list filter in the autorun below, thrown while rendering:
  // mobx would only log it, keeping the previous list filter.
  const [buildError, setBuildError] = useState<{ error: unknown }>()
  if (buildError) {
    throw buildError.error
  }

  const setFilter = useAddFilter<TFilter>(
    // Also without initial values, for `transformWhere`
    () => buildFilter(initialValues ?? ({} as TValues)),
    {
      debounce: true,
      onChange,
      // Called by the list `resetFilters` (eg. from the "no results" message)
      reset: () => handleResetFilters(),
    }
  )
  const [visibleFilters, setVisibleFilters] = useState(initialVisibleFilters)

  // Form values
  const form = useForm({
    initialValues,
  })

  // Sync filter with form values.
  // Use mobx autorun for better performances.
  useEffect(
    () =>
      autorun(() => {
        if (form.isValid) {
          let filter: TFilter
          try {
            filter = buildFilterRef.current!(form.values)
          } catch (error) {
            setBuildError({ error })
            return
          }
          setFilter(
            filter,
            // Tell the list whether these values are set by the user
            { isActive: (getActiveFilterNamesRef.current?.().length ?? 0) > 0 }
          )
        }
      }),
    []
  )

  // Translate filter name
  const translateFilterName = useCallback(
    (name: string) => {
      return translate(`resources.${resource}.filters.${name}`, {
        defaultValue: translate(`resources.${resource}.fields.${name}`, {
          defaultValue: humanize(name),
        }),
      })
    },
    [resource, translate]
  )

  // Sorted filters
  const filters = useMemo(() => {
    // In case filters should be sorted, sort them by name, moving always-on filters to the top.
    if (!sorted) {
      return oFilters
    }

    const alwaysOnFilters = oFilters.filter((f) => f.props.alwaysOn)
    const rest = oFilters
      .filter((f) => !f.props.alwaysOn)
      .sort((a, b) => {
        const nameA = a.props.label || translateFilterName(a.props.name)
        const nameB = b.props.label || translateFilterName(b.props.name)
        return nameA.localeCompare(nameB)
      })

    return [...alwaysOnFilters, ...rest]
  }, [oFilters, sorted, translateFilterName])

  // Remove filter values that are not used by any filter element.
  useEffect(() => {
    const names = getFilterNames(filters)
    const values = form.values
    const nextValues = removeUnusedFilterValues(values, names)
    if (values !== nextValues) {
      form.setValues(nextValues)
    }
  })

  // Calc which filters should be shown
  const shownFilters = filters.filter((filter) => {
    return filter.props.alwaysOn || visibleFilters.includes(filter.props.name)
  })

  // Filter options
  const filterOptions: EuiSelectableOption[] = filters
    .filter(
      (filter) => !filter.props.alwaysOn && !visibleFilters.includes(filter.props.name)
    )
    .map((filter) => {
      return {
        key: filter.props.name,
        label: filter.props.label || translateFilterName(filter.props.name),
      }
    })

  // Filters searchable
  const searchable = props.searchable ?? filterOptions.length > searchableWhenMoreThan

  // Add filter
  const handleAddFilter = useCallback((option: EuiSelectableOption) => {
    setVisibleFilters((names) => [...names, option.key!])
  }, [])

  // Remove filter
  const handleRemoveFilter = useCallback((filterName: string) => {
    form.resetField(filterName)
    // force field to be undefined, since `resetField` resets the field to its initial value
    form.setFieldValue(filterName, undefined)
    setVisibleFilters((names) => names.filter((o) => o !== filterName))
  }, [])

  // Reset filters, applying them immediately (without waiting for the debounce)
  const handleResetFilters = useCallback(() => {
    form.reset({} as TValues)
    setVisibleFilters([])
    setFilter.flush()
  }, [])

  // Filters with a value set by the user: not empty, and different from the default
  // value given by `initialValues` prop. It reads the form values when called,
  // so it is up to date also inside the autorun above, which runs before re-rendering.
  const getActiveFilterNames = () =>
    getFilterNames(filters).filter((name) => {
      const value = form.getFieldValue(name)
      return (
        !isEmptyFilterValue(value) &&
        !isEqual(value, get(props.initialValues ?? {}, name))
      )
    })

  const getActiveFilterNamesRef = useFreshRef(getActiveFilterNames)
  const activeFilterNames = new Set(getActiveFilterNames())

  // On unmount (or page unload), store state that will be restored
  const visibleFiltersRef = useFreshRef(visibleFilters)
  const storageRef = useFreshRef(storage)
  useEffect(() => {
    function storeData() {
      storageRef.current?.set({
        filterValues: form.values,
        visibleFilters: visibleFiltersRef.current,
      })
    }

    window.addEventListener("beforeunload", storeData)

    return () => {
      window.removeEventListener("beforeunload", storeData)
      storeData()
    }
  }, [])

  // Active filters show the same bottom bar EUI form controls show on focus
  const activeFilterStyle = {
    "--euiFormControlStateColor": euiTheme.colors.primary,
  } as CSSProperties

  const renderFilter = (filter: React.ReactElement<FilterBaseProps>) => {
    const isActive = activeFilterNames.has(filter.props.name)

    return (
      <div
        className={isActive ? "muiFilter muiFilter--active" : "muiFilter"}
        style={isActive ? activeFilterStyle : undefined}
      >
        {filter}
      </div>
    )
  }

  const renderBar = (isMobile: boolean) => {
    return (
      <EuiFlexGroup responsive={false}>
        <EuiFlexItem grow={true}>
          <EuiFlexGroup gutterSize={isMobile ? "none" : "l"} {...flexGroupProps}>
            {shownFilters.map((filter, i) => (
              <EuiFlexItem key={filter.props.name || i} grow={filter.props.grow || false}>
                <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
                  <EuiFlexItem grow={isMobile ? true : filter.props.grow || false}>
                    {renderFilter(filter)}
                  </EuiFlexItem>

                  {!filter.props.alwaysOn && (
                    <EuiFlexItem grow={false}>
                      <EuiButtonIcon
                        iconType="minusInCircle"
                        aria-label={translate(t.eui.filter.remove_filter)}
                        onClick={() => handleRemoveFilter(filter.props.name)}
                      />
                    </EuiFlexItem>
                  )}
                </EuiFlexGroup>
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <FilterBarButton
            filterOptions={filterOptions}
            onSelect={handleAddFilter}
            onReset={handleResetFilters}
            searchable={searchable}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    )
  }

  return (
    <form.FormContext>
      <EuiShowFor sizes={["s", "m", "l", "xl"]}>{renderBar(false)}</EuiShowFor>
      <EuiShowFor sizes={["xs"]}>{renderBar(true)}</EuiShowFor>
      {children}
    </form.FormContext>
  )
}

export const FilterBar = observer(FilterBarComp)
