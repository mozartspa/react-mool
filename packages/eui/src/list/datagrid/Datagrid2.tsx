import {
  Criteria,
  EuiBasicTable,
  EuiLoadingContent,
  EuiSpacer,
  EuiTableSelectionType,
} from "@elastic/eui"
import { Exp } from "@react-mool/core"
import { ReactNode, SyntheticEvent, useCallback, useEffect, useMemo, useRef } from "react"
import isEqual from "react-fast-compare"
import { useUpdateEffect } from "rooks"
import { ColumnElement } from "../column"
import { DatagridToolbar } from "./DatagridToolbar"
import { DatagridAction, DatagridRowClick } from "./types"
import { useColumnSettingsStorage } from "./useColumnSettingsStorage"
import { useDatagridColumnSelector } from "./useDatagridColumnSelector"
import {
  canHandleRowClick,
  getEuiSortField,
  getSortField,
  guessColumns,
  toEuiAction,
  toEuiColumn2,
} from "./utils"

export type DatagridProps2<TRecord = any> = {
  getItemId?: (item: TRecord) => string | number
  columns?: ColumnElement[]
  rowClick?: DatagridRowClick<TRecord>
  rowProps?: (item: TRecord) => object
  sortable?: boolean
  selectable?: boolean
  actions?: DatagridAction<TRecord>[]
  bulkActions?: DatagridAction<TRecord>[]
  empty?: ReactNode
  responsive?: boolean
  scrollToTop?: boolean
  scrollToTopOffset?: number
  showPagination?: boolean
  showTopPagination?: boolean
  showBottomPagination?: boolean
  showPageSize?: boolean
  showToolbar?: boolean
  showBulkActions?: boolean
  showSelectedCount?: boolean
  columnSettings?: boolean
  columnSettingsStorage?: Storage
  columnSettingsStorageKey?: string
}

const DEFAULT_GET_ITEM_ID = () => 0

export function Datagrid2<TRecord = any>(props: DatagridProps2<TRecord>) {
  const {
    getItemId = DEFAULT_GET_ITEM_ID,
    columns: columnsProp,
    rowClick: rowClickProp,
    rowProps: rowPropsProp,
    sortable = true,
    selectable: selectableProp,
    actions: actionsProp,
    bulkActions,
    empty,
    responsive,
    scrollToTop = true,
    scrollToTopOffset = 50,
    showPagination = true,
    showTopPagination = true,
    showBottomPagination = true,
    showPageSize = true,
    showToolbar = true,
    showBulkActions = bulkActions ? true : false,
    showSelectedCount = selectableProp ? true : false,
    columnSettings = true,
    columnSettingsStorage,
    columnSettingsStorageKey,
  } = props

  const {
    items,
    isLoading,
    isLoaded,
    page,
    pageSize,
    total,
    sortField = "",
    sortOrder,
    selectedIds,
    setPage,
    setPageSize,
    setSort,
    setSelectedIds,
  } = Exp.useListContext<TRecord>()

  const columnSettingsStored = useColumnSettingsStorage(
    columnSettingsStorageKey ?? `${"TODO"}-column-settings`,
    columnSettingsStorage
  )

  const availableColumns = columnsProp ?? guessColumns(items)
  const columnSelector = useDatagridColumnSelector({
    availableColumns,
    ...columnSettingsStored,
    columnLabel: (col) => col.props.header ?? col.props.name,
  })

  const columns = columnSettings ? columnSelector.orderedVisibleColumns : availableColumns
  const euiColumns = columns.map((col) => toEuiColumn2(col))

  const actions = actionsProp
    ? actionsProp.map((action) => toEuiAction(action))
    : undefined

  // handle EuiBasicTable onChange
  const handleChange = useCallback(
    ({ page, sort }: Criteria<any>) => {
      if (page) {
        setPage(page.index + 1)
        setPageSize(page.size)
      }
      if (sort) {
        setSort(getSortField(String(sort.field), columnsProp), sort.direction)
      }
    },
    [setPage, setPageSize, setSort, columnsProp]
  )

  // handle Toolbar onChangePage
  const handleChangePage = useCallback(
    (page: number) => {
      setPage(page + 1)
    },
    [setPage]
  )

  const rowClick = rowClickProp

  // If `selectable` prop is not explicitly set, it is true in case `rowClick` is set to `select`
  const selectable = selectableProp == null ? rowClick === "select" : selectableProp

  const rowProps = (item: TRecord) => {
    const handleClick = (event: SyntheticEvent) => {
      if (canHandleRowClick(event)) {
        // In case there are selected rows, or the rowClick behavior is "select",
        // clicking on a row toggles the row.
        if (rowClick === "select" || (selectable && selectedIds.length > 0)) {
          const itemId = getItemId(item)
          if (selectedIds.includes(itemId)) {
            setSelectedIds(selectedIds.filter((id) => id !== itemId))
          } else {
            setSelectedIds([...selectedIds, itemId])
          }
        } else {
          // Otherwise it triggers the rowClick behavior.
          if (rowClick instanceof Function) {
            return rowClick(item)
          }
        }
      }
    }

    const shouldHandleClick =
      rowClick !== "none" || (selectable && selectedIds.length > 0)

    return {
      ...rowPropsProp?.(item),
      onClick: shouldHandleClick ? handleClick : undefined,
    }
  }

  const tableRef = useRef<EuiBasicTable<any>>(null)

  const itemId = useMemo(() => {
    if (getItemId !== DEFAULT_GET_ITEM_ID) {
      return (item: TRecord) => {
        return item ? String(getItemId(item)) : ""
      }
    } else {
      return undefined
    }
  }, [getItemId])

  const initialSelected = useMemo(() => {
    return selectedIds.map((id) => items.find((item) => getItemId(item) === id))
  }, [])

  const selection: EuiTableSelectionType<any> = useMemo(() => {
    return {
      initialSelected,
      selectable: () => true,
      onSelectionChange: (selection) => {
        const ids = selection.map((item) => getItemId(item))
        if (!isEqual(ids, selectedIds)) {
          setSelectedIds(ids)
        }
      },
    }
  }, [selectedIds])

  const selectedItems = useMemo(() => {
    return selectedIds
      .map((id) => items.find((item) => getItemId(item) === id))
      .filter(Boolean)
  }, [selectedIds, items])

  useEffect(() => {
    tableRef.current?.setSelection(selectedItems)
  }, [tableRef.current, selectedItems])

  // Top ref
  const topRef = useRef<HTMLDivElement>(null)

  // When page changes, scroll to the top
  useUpdateEffect(() => {
    if (scrollToTop && topRef.current) {
      topRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }
  }, [page])

  const renderNoItemsMessage = () => {
    // First loading is when it's loading and it has no data yet
    const isFirstLoading = isLoading && !isLoaded

    if (isFirstLoading) {
      return <EuiLoadingContent lines={4} />
    } else {
      return empty ?? "Nessun elemento"
    }
  }

  // Add specific className when it's empty in order to style the empty view
  const tableClassName = items.length === 0 ? "euiBasicTable--empty" : undefined

  return (
    <div>
      <div ref={topRef} style={{ position: "relative", top: -scrollToTopOffset }}></div>
      {showToolbar && (
        <DatagridToolbar
          page={page}
          pageSize={pageSize}
          total={total}
          selectedItems={selectedItems}
          bulkActions={bulkActions}
          actions={columnSettings ? [columnSelector.columnSelector] : undefined}
          onChangePage={handleChangePage}
          showBulkActions={showBulkActions}
          showPagination={showPagination && showTopPagination}
          showSelectedCount={showSelectedCount}
        />
      )}
      {showToolbar && <EuiSpacer size="l" />}
      <EuiBasicTable
        ref={tableRef}
        className={tableClassName}
        items={items}
        columns={actions ? [...euiColumns, { actions }] : euiColumns}
        loading={isLoading}
        pagination={
          showPagination && showBottomPagination
            ? {
                pageIndex: page - 1,
                pageSize,
                totalItemCount: total,
                hidePerPageOptions: !showPageSize,
              }
            : undefined
        }
        sorting={{
          sort: {
            field: getEuiSortField(sortField, columnsProp) as any,
            direction: sortOrder ?? "asc",
          },
          readOnly: !sortable,
        }}
        selection={selectable ? selection : undefined}
        itemId={itemId}
        onChange={handleChange}
        rowProps={rowProps}
        noItemsMessage={renderNoItemsMessage()}
        responsive={responsive}
      />
    </div>
  )
}
