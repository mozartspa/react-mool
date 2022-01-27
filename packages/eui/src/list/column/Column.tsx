import { EuiTableFooterProps, formatAuto, HorizontalAlignment } from "@elastic/eui"
import { CSSProperties, ReactElement, ReactNode } from "react"

export type ColumnBaseProps<TRecord = any> = {
  id?: string
  name: string
  header?: ReactNode
  description?: string
  width?: string
  sortable?: boolean | string
  align?: HorizontalAlignment
  truncateText?: boolean
  isMobileHeader?: boolean
  mobileOptions?: {
    show?: boolean
    only?: boolean
    header?: boolean
  }
  hideForMobile?: boolean
  defaultHidden?: boolean
  style?: CSSProperties
  className?: string
  footer?: string | ReactElement | ((props: EuiTableFooterProps<TRecord>) => ReactNode)
}

export type ColumnRenderProps<TValue = any, TRecord = any> = {
  value?: TValue
  record?: TRecord
  isMobile?: boolean
}

export type ColumnProps<TValue = any, TRecord = any> = ColumnBaseProps<TRecord> &
  ColumnRenderProps<TValue, TRecord>

export type ColumnElement = ReactElement<ColumnProps>

export type ColumnComponentProps<TValue = any, TRecord = any> = ColumnProps<
  TValue,
  TRecord
> & {
  children?: (
    value: TValue | undefined,
    record: TRecord | undefined,
    isMobile: boolean
  ) => ReactNode
}

export const Column = (props: ColumnComponentProps) => {
  const { value, record, isMobile, children } = props

  return <>{children ? children(value, record, !!isMobile) : formatAuto(value)}</>
}
