import { ReactNode, useCallback, useMemo } from "react"
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
    if (!orderedIdSet.has(getColumnId(col)) && !col.props.defaultHidden) {
      columns.push(col)
    }
  })

  return orderedColumns
}

function onlyVisibleColumns(columns: ColumnElement[], visibleIds: string[] | undefined) {
  if (!visibleIds) {
    // In case visibleIds is not set, filter out the default hidden columns
    return columns.filter((col) => !col.props.defaultHidden)
  }

  const visibleIdSet = new Set(visibleIds)

  return columns.filter((col) => visibleIdSet.has(getColumnId(col)))
}

export type UseDatagridColumnSelectorOptions = {
  availableColumns: ColumnElement[]
  columnSettings: ColumnSettings
  setColumnSettings: (settings: ColumnSettings | undefined) => void
  columnLabel?: (column: ColumnElement) => ReactNode
}

export type UseDatagridColumnSelectorResult = {
  columnSelector: ReactNode
  orderedVisibleColumns: ColumnElement[]
}

export function useDatagridColumnSelector(
  options: UseDatagridColumnSelectorOptions
): UseDatagridColumnSelectorResult {
  const { availableColumns, columnSettings, setColumnSettings, columnLabel } = options

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
    () => visibleIds ?? orderedVisibleColumns.map((col) => getColumnId(col)),
    [visibleIds, orderedVisibleColumns]
  )

  const columnLabelById = useCallback(
    (id: string) => {
      const col = availableColumns.find((col) => getColumnId(col) === id)
      return col && columnLabel ? columnLabel(col) : id
    },
    [availableColumns, columnLabel]
  )

  const columnSelector = (
    <ColumnSelector
      orderedColumnIds={orderedColumnIds}
      visibleColumnIds={visibleColumnIds}
      columnLabel={columnLabelById}
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
