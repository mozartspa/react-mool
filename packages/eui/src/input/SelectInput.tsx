import { Select, SelectProps } from "../select"
import { noFormat } from "./helpers/noFormat"
import { Input, InputProps } from "./Input"

const defaultEmptyValue = () => null

export type SelectInputProps = InputProps & SelectProps

export const SelectInput = (props: SelectInputProps) => (
  <Input {...props} format={props.format ?? noFormat}>
    {(field, inputProps) => (
      <Select
        value={field.input.value}
        onBlur={() => field.setTouched(true)}
        onChange={(value) => field.setValue(value)}
        fullWidth={props.fullWidth}
        {...inputProps}
        emptyValue={inputProps.emptyValue ?? defaultEmptyValue}
      />
    )}
  </Input>
)
