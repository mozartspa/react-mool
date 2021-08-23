import { EuiFieldText, EuiFieldTextProps } from "@elastic/eui"
import { FieldInput, InputProps } from "./FieldInput"

export type TextInputProps = InputProps & EuiFieldTextProps

export const TextInput = (props: TextInputProps) => (
  <FieldInput {...props}>
    {(field) => <EuiFieldText {...field.input} {...props} />}
  </FieldInput>
)
