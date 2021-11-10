import { formatAuto, HorizontalAlignment } from "@elastic/eui"
import { ReactElement, ReactNode } from "react"

export type ColumnBaseProps = {
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
}

export type ColumnRenderProps<TValue = any, TRecord = any> = {
  value?: TValue
  record?: TRecord
  isMobile?: boolean
}

export type ColumnProps<TValue = any, TRecord = any> = ColumnBaseProps &
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
