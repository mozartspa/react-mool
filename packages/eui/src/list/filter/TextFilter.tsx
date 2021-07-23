import { EuiFieldSearch } from "@elastic/eui"
import { Filter, FilterComponentProps } from "./Filter"

export type TextFilterProps = FilterComponentProps & {
  placeholder?: string
  type?: string
}

export const TextFilter = (props: TextFilterProps) => {
  const { placeholder, type, ...filterProps } = props
  return (
    <Filter {...filterProps}>
      {(field) => (
        <EuiFieldSearch
          {...field.input}
          placeholder={placeholder}
          type={type}
          fullWidth
        />
      )}
    </Filter>
  )
}
