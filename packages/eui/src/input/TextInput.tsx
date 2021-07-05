import { EuiFieldText } from "@elastic/eui"
import { FieldInput, InputProps } from "./FieldInput"

export type TextInputProps = InputProps & {
  type?: string
}

export const TextInput = (props: TextInputProps) => (
  <FieldInput {...props}>
    {(field) => <EuiFieldText {...field.input} type={props.type} />}
  </FieldInput>
)
