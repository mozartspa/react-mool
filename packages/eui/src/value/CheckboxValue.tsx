import { EuiIcon, EuiTextColor } from "@elastic/eui"
import { ReactNode } from "react"
import { Value, ValueProps } from "./Value"

export type CheckboxValueProps = ValueProps & {
  checkboxLabel?: ReactNode
}

export const CheckboxValue = (props: CheckboxValueProps) => {
  const { checkboxLabel } = props

  return (
    <Value {...props}>
      {({ value }) => {
        return value ? (
          <>
            <EuiIcon type="checkInCircleFilled" color="success" /> {checkboxLabel}
          </>
        ) : (
          <EuiTextColor color="subdued">
            <EuiIcon type="crossInACircleFilled" /> {checkboxLabel}
          </EuiTextColor>
        )
      }}
    </Value>
  )
}
