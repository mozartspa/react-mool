import { EuiFormRow, formatAuto } from "@elastic/eui"
import { useRecord, useRecordValue, useTranslate } from "@react-mool/core"
import { ReactNode } from "react"
import { useGetResourceFieldLabel } from "../helpers"

export type ValueProps = {
  name: string
  label?: ReactNode | false
  fullWidth?: boolean
  helpText?: ReactNode | ReactNode[]
  format?: (value: any) => any
}

export type ValueRenderProps<TValue = any, TRecord = any> = {
  value: TValue | undefined
  record: TRecord | undefined
}

export type ValueComponentProps<TValue = any, TRecord = any> = ValueProps & {
  children?: (props: ValueRenderProps<TValue, TRecord>) => ReactNode
}

export const Value = (props: ValueComponentProps) => {
  const { name, label, fullWidth, helpText, format, children } = props

  const record = useRecord()
  const recordValue = useRecordValue(name)
  const getFieldLabel = useGetResourceFieldLabel()
  const translate = useTranslate()

  const value = format ? format(recordValue) : recordValue
  const valueLabel = translate(label) || getFieldLabel(name)
  const content = <>{children ? children({ value, record }) : formatAuto(value)}</>

  if (label === false) {
    return content
  } else {
    return (
      <EuiFormRow label={valueLabel} fullWidth={fullWidth} helpText={translate(helpText)}>
        {content}
      </EuiFormRow>
    )
  }
}
