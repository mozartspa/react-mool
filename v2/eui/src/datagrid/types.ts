import { EuiTableFooterProps, HorizontalAlignment } from "@elastic/eui"
import { CSSProperties, ReactElement, ReactNode } from "react"
import { FieldPath, FieldValues, PathValue } from "../types"

type ValueOf<T> = T[keyof T]

export type DataTableColumnCommon<TRecord = any> = {
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

export type DataTableColumnRenderOptions = {
  rowIndex: number
  isMobile: boolean
}

export type DataTableColumnField<TRecord extends FieldValues> =
  DataTableColumnCommon<TRecord> &
    ValueOf<
      {
        [K in FieldPath<TRecord>]: {
          field: K
          render: (
            value: PathValue<TRecord, K>,
            record: TRecord,
            options: DataTableColumnRenderOptions
          ) => ReactNode
        }
      }
    >

export type DataTableColumnRender<TRecord extends FieldValues> =
  DataTableColumnCommon<TRecord> & {
    id: string
    render: (record: TRecord, options: DataTableColumnRenderOptions) => ReactNode
  }

export type DataTableColumn<TRecord extends FieldValues> =
  | DataTableColumnField<TRecord>
  | DataTableColumnRender<TRecord>
