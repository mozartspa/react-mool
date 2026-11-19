import { SelectResource, SelectResourceProps } from "../../select/SelectResource"
import {
  EmptyOptionProps,
  resolveSelectToWhere,
  useOptionsWithEmptyOption,
} from "./emptyOption"
import { Filter, FilterComponent, FilterComponentProps } from "./Filter"

export type SelectResourceFilterProps = FilterComponentProps &
  EmptyOptionProps &
  Omit<SelectResourceProps, "value" | "onChange" | "onBlur">

export const SelectResourceFilter: FilterComponent<SelectResourceFilterProps> = (
  props
) => {
  const { emptyOption, ...filterProps } = props
  const { toWhere, ...selectProps } = filterProps
  const extraOptions = useOptionsWithEmptyOption(props.extraOptions, emptyOption)

  return (
    <Filter {...filterProps}>
      {(field) => (
        <SelectResource
          {...selectProps}
          extraOptions={extraOptions}
          value={field.value}
          onChange={(value: any) => {
            field.setValue(value)
          }}
          onBlur={() => field.setTouched()}
          updateValueOnOptionsChange={props.updateValueOnOptionsChange ?? true}
        />
      )}
    </Filter>
  )
}

SelectResourceFilter.resolveToWhere = resolveSelectToWhere

SelectResourceFilter.defaultProps = {
  emptyValue: () => undefined,
  popoverMode: "detached",
  isClearable: true,
}
