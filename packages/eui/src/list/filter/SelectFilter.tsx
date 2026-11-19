import { Select, SelectProps } from "../../select"
import {
  EmptyOptionProps,
  resolveSelectToWhere,
  useOptionsWithEmptyOption,
} from "./emptyOption"
import { Filter, FilterComponent, FilterComponentProps } from "./Filter"

export type SelectFilterProps<T = any> = FilterComponentProps &
  EmptyOptionProps &
  Omit<SelectProps<T>, "value" | "onChange" | "onBlur">

export const SelectFilter: FilterComponent<SelectFilterProps> = (props) => {
  const { emptyOption, ...filterProps } = props
  const { toWhere, ...selectProps } = filterProps
  const options = useOptionsWithEmptyOption(props.options, emptyOption)

  return (
    <Filter {...filterProps}>
      {(field) => (
        <Select
          {...selectProps}
          options={options}
          value={field.value}
          onBlur={() => field.setTouched(true)}
          onChange={(value) => {
            field.setValue(value)
          }}
          updateValueOnOptionsChange={props.updateValueOnOptionsChange ?? true}
        />
      )}
    </Filter>
  )
}

SelectFilter.resolveToWhere = resolveSelectToWhere

SelectFilter.defaultProps = {
  emptyValue: () => undefined,
  popoverMode: "detached",
  isClearable: true,
}
