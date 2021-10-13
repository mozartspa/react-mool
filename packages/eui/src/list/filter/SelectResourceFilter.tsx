import { SelectResource, SelectResourceProps } from "../../select/SelectResource"
import { Filter, FilterComponentProps } from "./Filter"

export type SelectResourceFilterProps = FilterComponentProps &
  Omit<SelectResourceProps, "value" | "onChange" | "onBlur">

export const SelectResourceFilter: React.FC<SelectResourceFilterProps> = (props) => {
  return (
    <Filter {...props}>
      {(field) => (
        <SelectResource
          {...props}
          value={field.value}
          onChange={(value: any) => {
            field.setValue(value)
          }}
          onBlur={() => field.setTouched()}
        />
      )}
    </Filter>
  )
}

SelectResourceFilter.defaultProps = {
  emptyValue: () => undefined,
  popoverMode: "detached",
}
