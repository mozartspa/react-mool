import { EuiFieldNumber, EuiFieldNumberProps } from "@elastic/eui"
import { FieldInput, InputProps } from "./FieldInput"

export type NumberInputProps = InputProps & EuiFieldNumberProps

export const NumberInput = (props: NumberInputProps) => (
  <FieldInput {...props}>
    {(field) => <EuiFieldNumber {...field.input} {...props} />}
  </FieldInput>
)
