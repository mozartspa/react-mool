import { SelectResource, SelectResourceProps } from "../select/SelectResource"
import { Input, InputProps } from "./Input"

const defaultEmptyValue = () => null

export type SelectResourceInputProps<TRecord = any, TFilter = any> = InputProps &
  Omit<SelectResourceProps<TRecord, TFilter>, "value" | "onChange" | "onBlur">

export const SelectResourceInput = <TRecord extends any, TFilter>(
  props: SelectResourceInputProps<TRecord, TFilter>
) => {
  return (
    <Input {...props}>
      {(field, inputProps) => (
        <SelectResource
          value={field.input.value}
          onBlur={() => field.setTouched(true)}
          onChange={(value: any) => field.setValue(value)}
          fullWidth={props.fullWidth}
          {...inputProps}
          emptyValue={inputProps.emptyValue ?? defaultEmptyValue}
        />
      )}
    </Input>
  )
}
