import { formatText } from "@elastic/eui"
import { CSSProperties } from "react"
import { Value, ValueProps } from "./Value"

export type TextAreaValueProps = ValueProps & {
  whiteSpace?: CSSProperties["whiteSpace"]
  style?: CSSProperties
}

export const TextAreaValue = (props: TextAreaValueProps) => {
  const { whiteSpace = "pre-wrap", style, ...valueProps } = props

  return (
    <Value {...valueProps}>
      {({ value }) => (
        <span style={{ lineHeight: 1.5, ...style, whiteSpace }}>{formatText(value)}</span>
      )}
    </Value>
  )
}
