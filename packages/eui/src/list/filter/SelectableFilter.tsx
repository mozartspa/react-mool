import { Selectable, SelectableProps } from "../../utilities"
import { Filter, FilterComponentProps } from "./Filter"

export type SelectableFilterProps<T = any> = FilterComponentProps &
  Omit<SelectableProps<T>, "value" | "onChange">

export const SelectableFilter = <T extends any>(props: SelectableFilterProps<T>) => {
  return (
    <Filter {...props}>
      {(field) => (
        <Selectable
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
