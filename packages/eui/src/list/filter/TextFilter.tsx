import { EuiFieldSearch } from "@elastic/eui"
import { Filter, FilterComponentProps } from "./Filter"

export type TextFilterProps = FilterComponentProps & {
  placeholder?: string
}

export const TextFilter = (props: TextFilterProps) => {
  const { placeholder, ...filterProps } = props
  return (
    <Filter {...filterProps}>
      {(field) => <EuiFieldSearch {...field.input} placeholder={placeholder} fullWidth />}
    </Filter>
  )
}
