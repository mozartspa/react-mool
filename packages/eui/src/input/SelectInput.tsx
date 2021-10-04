import { Select, SelectProps } from "../select"
import { Input, InputProps } from "./Input"

export type SelectInputProps = InputProps & SelectProps

export const SelectInput = (props: SelectInputProps) => (
  <Input {...props}>
    {(field, props) => (
      <Select
        value={field.input.value}
        onBlur={() => field.setTouched(true)}
        onChange={(value) => field.setValue(value)}
        {...props}
      />
    )}
  </Input>
)
