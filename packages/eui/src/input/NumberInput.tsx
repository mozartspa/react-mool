import { EuiFieldNumber, EuiFieldNumberProps } from "@elastic/eui"
import { Input, InputProps } from "./Input"

export type NumberInputProps = InputProps & EuiFieldNumberProps

export const NumberInput = (props: NumberInputProps) => (
  <Input {...props}>
    {(field) => <EuiFieldNumber {...field.input} step="any" {...props} />}
  </Input>
)
