import { EuiTextArea, EuiTextAreaProps } from "@elastic/eui"
import { Input, InputProps } from "./Input"

export type TextAreaInputProps = InputProps & EuiTextAreaProps

export const TextAreaInput = (props: TextAreaInputProps) => (
  <Input {...props}>
    {(field, inputProps) => (
      <EuiTextArea
        {...field.input}
        fullWidth={props.fullWidth}
        {...inputProps}
        children={undefined}
      />
    )}
  </Input>
)
