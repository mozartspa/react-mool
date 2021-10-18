import { EuiFieldPassword, EuiFieldPasswordProps } from "@elastic/eui"
import { Input, InputProps } from "./Input"

export type PasswordInputProps = InputProps & EuiFieldPasswordProps

export const PasswordInput = (props: PasswordInputProps) => (
  <Input {...props}>
    {(field, inputProps) => (
      <EuiFieldPassword
        {...field.input}
        type="dual"
        fullWidth={props.fullWidth}
        {...inputProps}
      />
    )}
  </Input>
)
