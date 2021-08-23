import { EuiTextArea, EuiTextAreaProps } from "@elastic/eui"
import { FieldInput, InputProps } from "./FieldInput"

export type TextAreaInputProps = InputProps & EuiTextAreaProps

export const TextAreaInput = (props: TextAreaInputProps) => (
  <FieldInput {...props}>
    {(field) => <EuiTextArea {...field.input} {...props} />}
  </FieldInput>
)
