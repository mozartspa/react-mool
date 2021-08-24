import { EuiFormRow, formatAuto } from "@elastic/eui"
import { useRecord, useRecordValue } from "@react-mool/core"
import { ReactNode } from "react"
import { useGetResourceFieldLabel } from "../helpers"

export type ValueProps = {
  name: string
  label?: string | false
  fullWidth?: boolean
  helpText?: ReactNode | ReactNode[]
}

export type ValueRenderProps<TValue = any, TRecord = any> = {
  value: TValue | undefined
  record: TRecord | undefined
}

export type ValueComponentProps<TValue = any, TRecord = any> = ValueProps & {
  children?: (props: ValueRenderProps<TValue, TRecord>) => ReactNode
}

export const Value = (props: ValueComponentProps) => {
  const { name, label, fullWidth, helpText, children } = props

  const value = useRecordValue(name)
  const record = useRecord()
  const getFieldLabel = useGetResourceFieldLabel()

  const valueLabel = label || getFieldLabel(name)
  const content = <>{children ? children({ value, record }) : formatAuto(value)}</>

  if (label === false) {
    return content
  } else {
    return (
      <EuiFormRow label={valueLabel} fullWidth={fullWidth} helpText={helpText}>
        {content}
      </EuiFormRow>
    )
  }
}
