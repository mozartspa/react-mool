import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSelectableOption,
} from "@elastic/eui"
import { useForm } from "@mozartspa/mobx-form"
import { useAddFilter, useResource, useTranslate } from "@react-mool/core"
import { autorun } from "mobx"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useState } from "react"
import { t } from "../../i18n"
import { FilterBaseProps } from "./Filter"
import { FilterBarButton } from "./FilterBarButton"

export type FilterBarProps<TFilter = any> = {
  initialValues?: TFilter
  filters: React.ReactElement<FilterBaseProps>[]
}

function FilterBarComp<TFilter>(props: FilterBarProps<TFilter>) {
  const { initialValues, filters } = props

  const translate = useTranslate()
  const resource = useResource()
  const setFilter = useAddFilter(initialValues, { debounce: true })
  const [visibleFilters, setVisibleFilters] = useState([] as string[])

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
    setVisibleFilters((names) => names.filter((o) => o !== filterName))
  }, [])

  // Reset filters
  const handleResetFilters = useCallback(() => {
    form.reset()
    setVisibleFilters([])
  }, [])

  return (
    <form.FormContext>
      <EuiFlexGroup>
        <EuiFlexItem grow={true}>
          <EuiFlexGroup>
            {shownFilters.map((filter, i) => (
              <EuiFlexItem key={filter.props.name || i} grow={filter.props.grow || false}>
                <EuiFlexGroup alignItems="center" gutterSize="xs">
                  <EuiFlexItem>{filter}</EuiFlexItem>

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
    </form.FormContext>
  )
}

export const FilterBar = observer(FilterBarComp)
