import { EuiButtonIconProps } from "@elastic/eui"
import { ReactNode } from "react"

export type DatagridAction<TRecord = any> = {
  name: ((item: TRecord) => ReactNode) | ReactNode
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
  | ((item: TRecord) => void)

export type ColumnSettings = {
  visibleIds?: string[]
  orderedIds?: string[]
}
