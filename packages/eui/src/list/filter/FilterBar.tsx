import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSelectableOption,
  EuiShowFor,
} from "@elastic/eui"
import { useForm } from "@mozartspa/mobx-form"
import { useAddFilter, useResource, useStorage, useTranslate } from "@react-mool/core"
import { autorun } from "mobx"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useFreshRef } from "rooks"
import { t } from "../../i18n"
import { FilterBaseProps } from "./Filter"
import { FilterBarButton } from "./FilterBarButton"

export type FilterBarProps<TFilter = any> = {
  initialValues?: TFilter
  filters: React.ReactElement<FilterBaseProps>[]
  restoreFromLast?: boolean
  restoreKey?: string
  restoreStorage?: Storage
}

function FilterBarComp<TFilter>(props: FilterBarProps<TFilter>) {
  const { filters, restoreFromLast, restoreKey, restoreStorage } = props

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

  const setFilter = useAddFilter(initialValues, { debounce: true })
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
          setFilter(form.values)
        }
      }),
    []
  )

  // Translate filter name
  const translateFilterName = (name: string) => {
    return translate(`resources.${resource}.filter.${name}`, {
      defaultValue: translate(`resources.${resource}.field.${name}`),
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

  // On unmount, store state that will be restored
  const visibleFiltersRef = useFreshRef(visibleFilters)
  const storageRef = useFreshRef(storage)
  useEffect(() => {
    return () => {
      storageRef.current?.set({
        filterValues: form.values,
        visibleFilters: visibleFiltersRef.current,
      })
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
    </form.FormContext>
  )
}

export const FilterBar = observer(FilterBarComp)
