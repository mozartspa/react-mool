import { formatText } from "@elastic/eui"
import { Value, ValueProps } from "./Value"

export type TextValueProps = ValueProps

export const TextValue = (props: TextValueProps) => (
  <Value {...props}>{({ value }) => formatText(value)}</Value>
)
