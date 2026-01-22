import { EuiButtonIconProps } from "@elastic/eui"
import { ReactNode, SyntheticEvent } from "react"

export type DatagridAction<TRecord = any> = {
  name: ((item: TRecord) => ReactNode) | ReactNode
  bulkName?: string
  run: (items: TRecord[]) => void
  description?: string | ((item: TRecord) => string)
  icon?: string
  color?: EuiButtonIconProps["color"]
  available?: (item: TRecord) => boolean
  enabled?: (item: TRecord) => boolean
  isPrimary?: boolean
}

export type DatagridRowClick<TRecord = any> =
  | "edit"
  | "detail"
  | "select"
  | "none"
  | ((item: TRecord, event?: SyntheticEvent) => void)

export type ColumnSettings = {
  visibleIds?: string[]
  orderedIds?: string[]
}
