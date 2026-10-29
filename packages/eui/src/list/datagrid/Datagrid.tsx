import {
  Criteria,
  EuiBasicTable,
  EuiScreenReaderLive,
  EuiSkeletonText,
  EuiSpacer,
  EuiTableSelectionType,
} from "@elastic/eui"
import {
  useListContext,
  useRedirect,
  useResourceDataProvider,
  useResourceDefinition,
  useTranslate,
} from "@react-mool/core"
import { ReactNode, SyntheticEvent, useCallback, useEffect, useMemo, useRef } from "react"
import isEqual from "react-fast-compare"
import { useUpdateEffect } from "rooks"
import { useGetFieldLabel } from "../../helpers"
import { t } from "../../i18n"
import { ColumnElement } from "../column"
import { DatagridNoResults } from "./DatagridNoResults"
import {
  getSkeletonItemId,
  getSkeletonItems,
  isSkeletonItem,
  SkeletonItem,
  skeletonSelection,
  toSkeletonColumns,
} from "./DatagridSkeleton"
import { DatagridToolbar } from "./DatagridToolbar"
import { DatagridAction, DatagridRowClick } from "./types"
import { useColumnSettingsStorage } from "./useColumnSettingsStorage"
import { useDatagridColumnSelector } from "./useDatagridColumnSelector"
import {
  canHandleRowClick,
  columnHeader,
  getDefaultRowClick,
  getEuiSortField,
  getSortField,
  guessColumns,
  toEuiAction,
  toEuiColumn,
} from "./utils"

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

export type DatagridProps<TRecord = any> = {
  columns?: ColumnElement[]
  rowClick?: DatagridRowClick<TRecord>
  rowProps?: (item: TRecord) => object
  sortable?: boolean
  selectable?: boolean
  actions?: DatagridAction<TRecord>[]
  bulkActions?: DatagridAction<TRecord>[]
  /** Shown when the list has no items and no filter is set */
  empty?: ReactNode
  /**
   * Shown when the list has no items because of the filters set.
   * Default is `<DatagridNoResults />`, use `<ResetFiltersButton />` to reset the filters.
   */
  emptyFiltered?: ReactNode
  responsive?: boolean
  scrollToTop?: boolean
  scrollToTopOffset?: number
  showPagination?: boolean
  showTopPagination?: boolean
  showBottomPagination?: boolean
  showPageSize?: boolean
  pageSizeOptions?: number[]
  showToolbar?: boolean
  showBulkActions?: boolean
  showSelectedCount?: boolean
  columnSettings?: boolean
  columnSettingsStorage?: Storage
  columnSettingsStorageKey?: string
}

export function Datagrid<TRecord extends object = any>(props: DatagridProps<TRecord>) {
  const {
    columns: columnsProp,
    rowClick: rowClickProp,
    rowProps: rowPropsProp,
    sortable = true,
    selectable: selectableProp,
    actions: actionsProp,
    bulkActions,
    empty,
    emptyFiltered,
    scrollToTop = true,
    scrollToTopOffset = 50,
    showPagination = true,
    showTopPagination = true,
    showBottomPagination = true,
    showPageSize = true,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    showToolbar = true,
    showBulkActions = bulkActions ? true : false,
    showSelectedCount = selectableProp ? true : false,
    columnSettings = true,
    columnSettingsStorage,
    columnSettingsStorageKey,
  } = props

  const {
    resource,
    items,
    isLoading,
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
    hasActiveFilters,
    query,
  } = useListContext<TRecord>()

  const translate = useTranslate()
  const redirect = useRedirect()
  const resourceDefinition = useResourceDefinition(resource)
  const resourceDataProvider = useResourceDataProvider(resource)
  const columnSettingsStored = useColumnSettingsStorage(
    columnSettingsStorageKey ?? `${resource}-column-settings`,
    columnSettingsStorage
  )

  const availableColumns = columnsProp ?? guessColumns(items)
  const columnSelector = useDatagridColumnSelector({
    availableColumns,
    ...columnSettingsStored,
    columnLabel: (col) => columnHeader(col, resource, translate),
  })

  const columns = columnSettings ? columnSelector.orderedVisibleColumns : availableColumns
  const euiColumns = columns.map((col) => toEuiColumn(col, resource, translate))

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

  const rowClick = getDefaultRowClick(rowClickProp, resourceDefinition)

  // If `selectable` prop is not explicitly set, it is true in case `rowClick` is set to `select`
  const selectable = selectableProp == null ? rowClick === "select" : selectableProp

  const rowProps = (item: TRecord) => {
    const handleClick = (event: SyntheticEvent) => {
      if (canHandleRowClick(event)) {
        // In case there are selected rows, or the rowClick behavior is "select",
        // clicking on a row toggles the row.
        if (rowClick === "select" || (selectable && selectedIds.length > 0)) {
          const itemId = resourceDataProvider.id(item)
          if (selectedIds.includes(itemId)) {
            setSelectedIds(selectedIds.filter((id) => id !== itemId))
          } else {
            setSelectedIds([...selectedIds, itemId])
          }
        } else {
          // Otherwise it triggers the rowClick behavior.
          if (rowClick === "detail") {
            redirect("detail", { id: resourceDataProvider.id(item), event })
          } else if (rowClick === "edit") {
            redirect("edit", { id: resourceDataProvider.id(item), event })
          } else if (rowClick instanceof Function) {
            return rowClick(item, event)
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

  const itemId = useCallback(
    (item: TRecord) => {
      return item ? String(resourceDataProvider.id(item)) : ""
    },
    [resourceDataProvider, resourceDataProvider.id]
  )

  const initialSelected = useMemo(() => {
    return selectedIds.map((id) =>
      items.find((item) => resourceDataProvider.id(item) === id)
    )
  }, [])

  const selection: EuiTableSelectionType<any> = useMemo(() => {
    return {
      initialSelected,
      selectable: () => true,
      onSelectionChange: (selection) => {
        const ids = selection.map((item) => resourceDataProvider.id(item))
        if (!isEqual(ids, selectedIds)) {
          setSelectedIds(ids)
        }
      },
    }
  }, [selectedIds, resourceDataProvider, resourceDataProvider.id])

  const selectedItems = useMemo(() => {
    return selectedIds
      .map((id) => items.find((item) => resourceDataProvider.id(item) === id))
      .filter(Boolean)
  }, [selectedIds, items, resourceDataProvider, resourceDataProvider.id])

  useEffect(() => {
    tableRef.current?.setState({ selection: selectedItems })
  }, [tableRef.current, selectedItems])

  // Top ref
  const topRef = useRef<HTMLDivElement>(null)

  // When page changes, scroll to the top
  useUpdateEffect(() => {
    if (scrollToTop && topRef.current) {
      topRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }
  }, [page])

  // Loading with no rows to show: on first load, or when reloading an empty result
  // (eg. after resetting the filters). Show a skeleton instead of the "no items" message.
  const isLoadingEmpty = isLoading && items.length === 0

  // Placeholder rows shaped like the real table.
  // Columns guessed from items are not known yet, in that case fallback to a text skeleton.
  const showSkeletonRows = isLoadingEmpty && euiColumns.length > 0
  const allColumns = actions ? [...euiColumns, { actions }] : euiColumns
  const tableColumns = showSkeletonRows ? toSkeletonColumns(allColumns) : allColumns
  const tableItems: Array<TRecord | SkeletonItem> = showSkeletonRows
    ? getSkeletonItems(pageSize)
    : items

  const tableItemId = (item: TRecord | SkeletonItem) =>
    isSkeletonItem(item) ? getSkeletonItemId(item) : itemId(item)

  const renderNoItemsMessage = () => {
    if (isLoadingEmpty) {
      return <EuiSkeletonText lines={4} />
    } else if (hasActiveFilters && !query.isError) {
      // On load error, don't suggest that the filters are the reason of the empty list
      return emptyFiltered ?? <DatagridNoResults />
    } else {
      return empty ?? translate(t.eui.grid.no_items)
    }
  }

  // Add specific className when it's empty in order to style the empty view
  const tableClassName = tableItems.length === 0 ? "euiBasicTable--empty" : undefined

  // Screen reader sort announcement
  const getFieldLabel = useGetFieldLabel()
  const screenReaderSortAnnouncement = sortField
    ? translate(
        sortOrder === "asc" ? t.eui.grid.sorted_by_asc : t.eui.grid.sorted_by_desc,
        { field: getFieldLabel(resource, sortField) }
      )
    : null

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
      <EuiScreenReaderLive>{screenReaderSortAnnouncement}</EuiScreenReaderLive>
      <EuiBasicTable
        ref={tableRef}
        className={tableClassName}
        items={tableItems}
        columns={tableColumns}
        loading={isLoading}
        pagination={
          showPagination && showBottomPagination
            ? {
                pageIndex: page - 1,
                pageSize,
                totalItemCount: total,
                showPerPageOptions: showPageSize,
                pageSizeOptions,
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
        selection={
          selectable ? (showSkeletonRows ? skeletonSelection : selection) : undefined
        }
        itemId={tableItemId}
        onChange={handleChange}
        rowProps={showSkeletonRows ? undefined : rowProps}
        noItemsMessage={renderNoItemsMessage()}
      />
    </div>
  )
}
