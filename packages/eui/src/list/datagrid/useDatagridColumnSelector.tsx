import { ReactNode, useMemo } from "react"
import { ColumnElement } from "../column"
import { ColumnSelector } from "./ColumnSelector"
import { ColumnSettings } from "./types"
import { getColumnId } from "./utils"

function sortColumns(columns: ColumnElement[], orderedIds: string[] | undefined) {
  if (!orderedIds) {
    return columns
  }

  const orderedIdSet = new Set(orderedIds)
  const orderedColumns = Array.from(orderedIdSet)
    .map((id) => columns.find((col) => getColumnId(col) === id) as ColumnElement)
    .filter(Boolean)

  columns.forEach((col) => {
    if (!orderedIdSet.has(getColumnId(col))) {
      columns.push(col)
    }
  })

  return orderedColumns
}

function onlyVisibleColumns(columns: ColumnElement[], visibleIds: string[] | undefined) {
  if (!visibleIds) {
    return columns
  }

  const visibleIdSet = new Set(visibleIds)

  return columns.filter((col) => visibleIdSet.has(getColumnId(col)))
}

export type UseDatagridColumnSelectorOptions = {
  availableColumns: ColumnElement[]
  columnSettings: ColumnSettings
  setColumnSettings: (settings: ColumnSettings | undefined) => void
}

export type UseDatagridColumnSelectorResult = {
  columnSelector: ReactNode
  orderedVisibleColumns: ColumnElement[]
}

export function useDatagridColumnSelector(
  options: UseDatagridColumnSelectorOptions
): UseDatagridColumnSelectorResult {
  const { availableColumns, columnSettings, setColumnSettings } = options

  const { visibleIds, orderedIds } = columnSettings

  const orderedColumns = useMemo(
    () => sortColumns(availableColumns, orderedIds),
    [availableColumns, orderedIds]
  )

  const orderedVisibleColumns = useMemo(
    () => onlyVisibleColumns(orderedColumns, visibleIds),
    [orderedColumns, visibleIds]
  )

  const orderedColumnIds = useMemo(
    () => orderedColumns.map((col) => getColumnId(col)),
    [orderedColumns]
  )
  const visibleColumnIds = useMemo(
    () => visibleIds ?? orderedColumnIds,
    [visibleIds, orderedColumnIds]
  )

  const columnSelector = (
    <ColumnSelector
      orderedColumnIds={orderedColumnIds}
      visibleColumnIds={visibleColumnIds}
      onChangeOrder={(nextColumnIds) => {
        setColumnSettings({ orderedIds: nextColumnIds, visibleIds })
      }}
      onChangeVisibility={(id, visible) => {
        if (visible) {
          setColumnSettings({ orderedIds, visibleIds: [...visibleColumnIds, id] })
        } else {
          setColumnSettings({
            orderedIds,
            visibleIds: visibleColumnIds.filter((columnId) => columnId !== id),
          })
        }
      }}
      onReset={() => {
        setColumnSettings(undefined)
      }}
    />
  )

  return {
    columnSelector,
    orderedVisibleColumns,
  }
}
