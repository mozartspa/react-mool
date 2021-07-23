import { EuiFlexGroup, EuiFlexItem, EuiSelectableOption } from "@elastic/eui"
import { useForm } from "@mozartspa/mobx-form"
import { useAddFilter, useResource, useTranslate } from "@react-mool/core"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useState } from "react"
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
  const [_, setFilter] = useAddFilter(initialValues, { debounce: true })
  const [visibleFilters, setVisibleFilters] = useState([] as string[])

  // Form values
  const form = useForm({
    initialValues,
  })

  // Sync filter with form values
  useEffect(() => {
    if (form.isValid) {
      setFilter(form.values)
    }
  }, [form.values, form.isValid])

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
  const filterOptions: EuiSelectableOption[] = filters.map((filter) => {
    return {
      key: filter.props.name,
      label: filter.props.label || translateFilterName(filter.props.name),
      checked: visibleFilters.includes(filter.props.name) ? "on" : undefined,
      disabled: filter.props.alwaysOn,
    }
  })

  // Handle change filters
  const handleChangeFilters = useCallback((options: EuiSelectableOption[]) => {
    const visibleNames = options.filter((o) => o.checked === "on").map((o) => o.key!)
    setVisibleFilters(visibleNames)
  }, [])

  return (
    <form.FormContext>
      <EuiFlexGroup>
        <EuiFlexItem grow={true}>
          <EuiFlexGroup>
            {shownFilters.map((filter, i) => (
              <EuiFlexItem key={filter.props.name || i} grow={filter.props.grow || false}>
                {filter}
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <FilterBarButton filterOptions={filterOptions} onChange={handleChangeFilters} />
        </EuiFlexItem>
      </EuiFlexGroup>
    </form.FormContext>
  )
}

export const FilterBar = observer(FilterBarComp)
