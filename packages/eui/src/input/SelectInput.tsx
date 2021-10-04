import { Select, SelectProps } from "../select"
import { Input, InputProps } from "./Input"

export type SelectInputProps = InputProps & SelectProps

export const SelectInput = (props: SelectInputProps) => (
  <Input {...props}>
    {(field, inputProps) => (
      <Select
        value={field.input.value}
        onBlur={() => field.setTouched(true)}
        onChange={(value) => field.setValue(value)}
        fullWidth={props.fullWidth}
        {...inputProps}
      />
    )}
  </Input>
)
