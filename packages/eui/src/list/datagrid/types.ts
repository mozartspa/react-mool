import { EuiButtonIconColor } from "@elastic/eui"
import { ReactNode } from "react"

export type DatagridAction<TRecord = any> = {
  name: ReactNode
  run: (items: TRecord[]) => void
  description?: string
  icon?: string
  color?: EuiButtonIconColor
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
