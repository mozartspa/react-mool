import { EuiFieldSearch } from "@elastic/eui"
import { useCallback } from "react"
import { Filter, FilterComponentProps } from "./Filter"

export type NumberFilterProps = FilterComponentProps & {
  placeholder?: string
  isClearable?: boolean
}

export const NumberFilter = (props: NumberFilterProps) => {
  const { placeholder, isClearable, format, ...filterProps } = props

  const handleFormat = useCallback(
    (value: any) => (value == null ? "" : String(value)),
    []
  )

  return (
    <Filter {...filterProps} format={format ?? handleFormat}>
      {(field) => (
        <EuiFieldSearch
          {...field.input}
          placeholder={placeholder}
          title={placeholder}
          isClearable={isClearable ?? filterProps.alwaysOn ?? false}
          fullWidth
          type="number"
          step="any"
        />
      )}
    </Filter>
  )
}
