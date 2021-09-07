import { EuiTextArea, EuiTextAreaProps } from "@elastic/eui"
import { Input, InputProps } from "./Input"

export type TextAreaInputProps = InputProps & EuiTextAreaProps

export const TextAreaInput = (props: TextAreaInputProps) => (
  <Input {...props}>
    {(field, props) => <EuiTextArea {...field.input} {...props} />}
  </Input>
)
