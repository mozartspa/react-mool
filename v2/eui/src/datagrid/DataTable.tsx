import { UseListResult } from "@react-mool/core-v2"
import { ReactNode } from "react"
import { FieldValues } from "../types"
import { DataTableColumn } from "./types"

export type DataTableProps<
  TRecord extends FieldValues,
  TColumns extends readonly DataTableColumn<TRecord>[]
> = {
  list: UseListResult<TRecord>
  columns: TColumns
  rowClick?: (item: TRecord) => void
  rowProps?: (item: TRecord) => object
  sortable?: boolean
  selectable?: boolean
  empty?: ReactNode
  responsive?: boolean
  scrollToTop?: boolean
  scrollToTopOffset?: number
}

export const DataTable = <
  TRecord extends FieldValues,
  TColumns extends readonly DataTableColumn<TRecord>[]
>(
  props: DataTableProps<TRecord, TColumns>
) => {
  const {
    list,
    columns,
    rowClick: rowClickProp,
    rowProps: rowPropsProp,
    sortable = true,
    selectable,
    empty,
    responsive,
    scrollToTop = true,
    scrollToTopOffset = 50,
  } = props

  return null
}
