import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSelectableOption,
  EuiShowFor,
} from "@elastic/eui"
import { FormValues, useForm } from "@mozartspa/mobx-form"
import { useAddFilter, useResource, useStorage, useTranslate } from "@react-mool/core"
import { autorun } from "mobx"
import { observer } from "mobx-react-lite"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useFreshRef } from "rooks"
import { humanize } from "../../helpers/humanize"
import { t } from "../../i18n"
import { FilterBaseProps } from "./Filter"
import { FilterBarButton } from "./FilterBarButton"

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

export type FilterBarProps<TFilter extends FormValues = any, TFilterOut = TFilter> = {
  initialValues?: TFilter
  transformValues?: (values: TFilter) => TFilterOut
  filters: React.ReactElement<FilterBaseProps>[]
  restoreFromLast?: boolean
  restoreKey?: string
  restoreStorage?: Storage
  allowUnusedFilterValues?: boolean
  onChange?: (values: TFilter) => void
  children?: ReactNode
}

function FilterBarComp<TFilter extends FormValues, TFilterOut = TFilter>(
  props: FilterBarProps<TFilter, TFilterOut>
) {
  const {
    filters,
    restoreFromLast,
    restoreKey,
    restoreStorage,
    allowUnusedFilterValues = false,
    onChange,
    children,
  } = props

  const translate = useTranslate()
  const resource = useResource()

  const storage = useStorage(restoreKey ?? `${resource}-filterbar`, {
    enabled: restoreFromLast,
    storage: restoreStorage,
  })

  const initialValues = useMemo(
    () => storage.getValue("filterValues", props.initialValues),
    []
  )
  const initialVisibleFilters = useMemo(
    () => storage.getValue("visibleFilters", [] as string[]),
    []
  )

  const setFilter = useAddFilter(
    () => {
      // Transform filter values if a transform function is provided
      // and there are initial values.
      return props.transformValues && initialValues
        ? (props.transformValues(initialValues) as any) // any is ugly, but don't know how to fix it
        : initialValues
    },
    { debounce: true, onChange }
  )
  const [visibleFilters, setVisibleFilters] = useState(initialVisibleFilters)

  // Form values
  const form = useForm({
    initialValues,
  })

  // Transform filter values reference
  const transformValuesRef = useFreshRef(props.transformValues)

  // Sync filter with form values.
  // Use mobx autorun for better performances.
  useEffect(
    () =>
      autorun(() => {
        if (form.isValid) {
          // Transform filter values before applying them,
          // if a transform function is provided.
          setFilter(
            transformValuesRef.current
              ? (transformValuesRef.current(form.values) as any) // any is ugly, but don't know how to fix it
              : form.values
          )
        }
      }),
    []
  )

  // Remove filter values that are not used by any filter element.
  useEffect(() => {
    if (allowUnusedFilterValues) {
      return
    }

    const names = getFilterNames(filters)
    const values = form.values
    const nextValues = removeUnusedFilterValues(values, names)
    if (values !== nextValues) {
      form.setValues(nextValues)
    }
  })

  // Translate filter name
  const translateFilterName = (name: string) => {
    return translate(`resources.${resource}.filters.${name}`, {
      defaultValue: translate(`resources.${resource}.fields.${name}`, {
        defaultValue: humanize(name),
      }),
    })
  }

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

  // Reset filters
  const handleResetFilters = useCallback(() => {
    form.reset({} as TFilter)
    setVisibleFilters([])
  }, [])

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

  const renderBar = (isMobile: boolean) => {
    return (
      <EuiFlexGroup responsive={false}>
        <EuiFlexItem grow={true}>
          <EuiFlexGroup gutterSize={isMobile ? "none" : "l"}>
            {shownFilters.map((filter, i) => (
              <EuiFlexItem key={filter.props.name || i} grow={filter.props.grow || false}>
                <EuiFlexGroup alignItems="center" gutterSize="xs" responsive={false}>
                  <EuiFlexItem grow={isMobile ? true : filter.props.grow || false}>
                    {filter}
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
