import { Select, SelectProps } from "../../select"
import { Filter, FilterComponentProps } from "./Filter"

export type SelectFilterProps<T = any> = FilterComponentProps &
  Omit<SelectProps<T>, "value" | "onChange">

export const SelectFilter = (props: SelectFilterProps) => {
  return (
    <Filter {...props}>
      {(field) => (
        <Select
          {...props}
          value={field.value}
          onChange={(value) => {
            field.setValue(value)
          }}
        />
      )}
    </Filter>
  )
}
