import { EuiFormRow, formatAuto } from "@elastic/eui"
import { useRecord, useRecordValue, useTranslate } from "@react-mool/core"
import React, { ReactNode } from "react"
import { useGetResourceFieldLabel } from "../helpers"
import { ValueContainer, ValueContainerProps } from "./ValueContainer"

export type RenderValueFunc = (args: {
  value: any
  record: any
  defaultContent: ReactNode
}) => ReactNode

export type ValueProps = {
  name: string
  label?: ReactNode | false
  fullWidth?: boolean
  helpText?: ReactNode | ReactNode[]
  format?: (value: any) => any
  customRenderValue?: RenderValueFunc
  valueContainerProps?: ValueContainerProps
  noFormRow?: boolean
  noValueContainer?: boolean
}

export type ValueRenderProps<TValue = any, TRecord = any> = {
  value: TValue | undefined
  record: TRecord | undefined
}

export type ValueComponentProps<TValue = any, TRecord = any> = ValueProps & {
  children?: (props: ValueRenderProps<TValue, TRecord>) => ReactNode
}

export const Value: React.FC<ValueComponentProps> = (props) => {
  const {
    name,
    label,
    fullWidth,
    helpText,
    format,
    noFormRow = false,
    customRenderValue,
    valueContainerProps,
    noValueContainer = noFormRow,
    children,
  } = props

  const record = useRecord()
  const recordValue = useRecordValue(name)
  const getFieldLabel = useGetResourceFieldLabel()
  const translate = useTranslate()

  const value = format ? format(recordValue) : recordValue
  const valueLabel = translate(label) ?? getFieldLabel(name)
  const defaultContent = children ? children({ value, record }) : formatAuto(value)
  const content = customRenderValue
    ? customRenderValue({ value, record, defaultContent })
    : defaultContent

  const wrappedContent = noValueContainer ? (
    <>{content}</>
  ) : (
    <ValueContainer {...valueContainerProps}>{content}</ValueContainer>
  )

  if (noFormRow) {
    return wrappedContent
  } else {
    return (
      <EuiFormRow
        label={label === false ? null : valueLabel}
        fullWidth={fullWidth}
        helpText={translate(helpText)}
      >
        {wrappedContent}
      </EuiFormRow>
    )
  }
}
