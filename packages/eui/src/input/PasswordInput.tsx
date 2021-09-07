import { EuiFieldPassword, EuiFieldPasswordProps } from "@elastic/eui"
import { Input, InputProps } from "./Input"

export type PasswordInputProps = InputProps & EuiFieldPasswordProps

export const PasswordInput = (props: PasswordInputProps) => (
  <Input {...props}>
    {(field) => <EuiFieldPassword {...field.input} type="dual" {...props} />}
  </Input>
)
