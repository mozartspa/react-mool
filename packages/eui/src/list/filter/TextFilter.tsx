import { EuiFieldSearch } from "@elastic/eui"
import { Filter, FilterComponentProps } from "./Filter"

export type TextFilterProps = FilterComponentProps & {
  type?: string
  placeholder?: string
  isClearable?: boolean
}

export const TextFilter = (props: TextFilterProps) => {
  const { type = "search", placeholder, isClearable, ...filterProps } = props
  return (
    <Filter {...filterProps}>
      {(field) => (
        <EuiFieldSearch
          {...field.input}
          placeholder={placeholder}
          type={type}
          isClearable={isClearable ?? filterProps.alwaysOn ?? false}
          fullWidth
        />
      )}
    </Filter>
  )
}
