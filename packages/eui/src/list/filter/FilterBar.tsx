import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui"
import { useForm } from "@mozartspa/mobx-form"
import { useAddFilter } from "@react-mool/core"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { FilterBaseProps } from "./Filter"

export type FilterBarProps<TFilter = any> = {
  initialValues?: TFilter
  filters: React.ReactElement<FilterBaseProps>[]
}

function FilterBarComp<TFilter>(props: FilterBarProps<TFilter>) {
  const { initialValues, filters } = props

  const [_, setFilter] = useAddFilter(initialValues, { debounce: true })

  const form = useForm({
    initialValues,
  })

  useEffect(() => {
    if (form.isValid) {
      setFilter(form.values)
    }
  }, [form.values, form.isValid])

  return (
    <form.FormContext>
      <EuiFlexGroup>
        {filters.map((filter, i) => (
          <EuiFlexItem key={filter.props.name || i} grow={filter.props.grow || false}>
            {filter}
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </form.FormContext>
  )
}

export const FilterBar = observer(FilterBarComp)
