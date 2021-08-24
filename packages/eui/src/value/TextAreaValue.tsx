import { formatText } from "@elastic/eui"
import { CSSProperties } from "react"
import { Value, ValueProps } from "./Value"

export type TextAreaValueProps = ValueProps & {
  whiteSpace?: CSSProperties["whiteSpace"]
}

export const TextAreaValue = (props: TextAreaValueProps) => {
  const { whiteSpace = "pre-wrap", ...valueProps } = props

  return (
    <Value {...valueProps}>
      {({ value }) => <span style={{ whiteSpace }}>{formatText(value)}</span>}
    </Value>
  )
}
