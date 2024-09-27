import { EuiIcon, EuiTextColor } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode } from "react"
import { Value, ValueProps } from "./Value"

export type RadioValueProps = ValueProps & {
  radioLabel?: ReactNode
}

export const RadioValue = (props: RadioValueProps) => {
  const { radioLabel } = props

  const translate = useTranslate()
  const tRadioLabel = translate(radioLabel)

  return (
    <Value {...props}>
      {({ value }) => {
        return value ? (
          <>
            <EuiIcon type="checkInCircleFilled" color="success" /> {tRadioLabel}
          </>
        ) : (
          <EuiTextColor color="subdued">
            <EuiIcon type="dotInCircle" /> {tRadioLabel}
          </EuiTextColor>
        )
      }}
    </Value>
  )
}
