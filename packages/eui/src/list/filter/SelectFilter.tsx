import { Select, SelectProps } from "../../select"
import { Filter, FilterComponentProps } from "./Filter"

export type SelectFilterProps = FilterComponentProps &
  Pick<SelectProps, "options" | "placeholder">

export const SelectFilter = (props: SelectFilterProps) => {
  const { options, placeholder } = props

  return (
    <Filter {...props}>
      {(field) => (
        <Select
          {...field.input}
          onChange={(value) => field.setValue(value)}
          options={options}
          placeholder={placeholder}
        />
      )}
    </Filter>
  )
}
