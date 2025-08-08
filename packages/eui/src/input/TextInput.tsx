import { EuiFieldText, EuiFieldTextProps } from "@elastic/eui"
import { Input, InputProps } from "./Input"

export type TextInputProps = InputProps & EuiFieldTextProps

export const TextInput = (props: TextInputProps) => (
  <Input {...props}>
    {(field, inputProps) => (
      <EuiFieldText
        {...field.input}
        fullWidth={props.fullWidth}
        {...inputProps}
        children={undefined}
      />
    )}
  </Input>
)
