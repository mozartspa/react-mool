import { EuiIcon, EuiTextColor } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode } from "react"
import { Value, ValueProps } from "./Value"

export type CheckboxValueProps = ValueProps & {
  checkboxLabel?: ReactNode
}

export const CheckboxValue = (props: CheckboxValueProps) => {
  const { checkboxLabel } = props

  const translate = useTranslate()
  const tCheckboxLabel = translate(checkboxLabel)

  return (
    <Value {...props}>
      {({ value }) => {
        return value ? (
          <>
            <EuiIcon type="checkInCircleFilled" color="success" /> {tCheckboxLabel}
          </>
        ) : (
          <EuiTextColor color="subdued">
            <EuiIcon type="crossInACircleFilled" /> {tCheckboxLabel}
          </EuiTextColor>
        )
      }}
    </Value>
  )
}
