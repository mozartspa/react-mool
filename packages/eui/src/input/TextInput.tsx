import { EuiFieldText } from "@elastic/eui"
import { FieldInput, InputProps } from "./FieldInput"

export type TextInputProps = InputProps

export const TextInput = (props: TextInputProps) => (
  <FieldInput {...props}>{(field) => <EuiFieldText {...field.input} />}</FieldInput>
)
