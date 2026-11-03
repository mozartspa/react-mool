import {
  Criteria,
  EuiBasicTable,
  EuiScreenReaderLive,
  EuiSkeletonText,
  EuiSpacer,
  EuiTablePagination,
  EuiTableSelectionType,
  shade,
  tint,
  transparentize,
  useEuiTheme,
} from "@elastic/eui"
import {
  useListContext,
  useRedirect,
  useResourceDataProvider,
  useResourceDefinition,
  useTranslate,
} from "@react-mool/core"
import {
  CSSProperties,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
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
import { ColumnWidths, MIN_AUTO_COLUMN_WIDTH } from "./ColumnResizer"
import { DatagridToolbar } from "./DatagridToolbar"
import { DatagridAction, DatagridRowClick } from "./types"
import { useColumnSettingsStorage } from "./useColumnSettingsStorage"
import { useDatagridColumnSelector } from "./useDatagridColumnSelector"
import {
  canHandleRowClick,
  columnHeader,
  getDefaultRowClick,
  getColumnId,
  getEuiSortField,
  getSortField,
  guessColumns,
  parsePixels,
  toEuiAction,
  toEuiColumn,
} from "./utils"

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

const SELECTION_COLUMN_WIDTH = 32

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
  /** Allows the user to resize the columns. Widths are stored with the column settings. */
  resizableColumns?: boolean
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
    resizableColumns = true,
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
    defaults,
  } = useListContext<TRecord>()

  const translate = useTranslate()
  const { euiTheme, colorMode } = useEuiTheme()
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

  const { columnSettings: storedSettings, setColumnSettings } = columnSettingsStored
  const columnWidths = resizableColumns ? storedSettings.widths : undefined
  const setColumnWidths = (changedWidths: ColumnWidths) => {
    const widths: Record<string, string> = {}
    Object.entries({ ...storedSettings.widths, ...changedWidths }).forEach(
      ([id, width]) => {
        if (width) {
          widths[id] = width
        }
      }
    )
    setColumnSettings({ ...storedSettings, widths })
  }

  const euiColumns = columns.map((col) => {
    const id = getColumnId(col)
    return toEuiColumn(col, resource, translate, {
      width: columnWidths?.[id],
      onResize: resizableColumns ? setColumnWidths : undefined,
    })
  })

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
        const field = getSortField(String(sort.field), columnsProp)

        const isThirdClick =
          field === sortField && sortOrder === "desc" && sort.direction === "asc"

        if (isThirdClick && field !== defaults.sortField) {
          setSort(defaults.sortField, defaults.sortOrder)
        } else {
          setSort(field, sort.direction)
        }
      }
    },
    [setPage, setPageSize, setSort, columnsProp, sortField, sortOrder, defaults]
  )

  // handle Toolbar onChangePage
  const handleChangePage = useCallback(
    (page: number) => {
      setPage(page + 1)
    },
    [setPage]
  )

  // handle bottom pagination onChangeItemsPerPage
  const handleChangePageSize = useCallback(
    (size: number) => {
      setPage(1)
      setPageSize(size)
    },
    [setPage, setPageSize]
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
    return selectedIds
      .map((id) => items.find((item) => resourceDataProvider.id(item) === id))
      .filter(Boolean)
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

  // The bottom pagination is rendered outside of EuiBasicTable, which scrolls horizontally
  // when the resized columns are wider than the container (see Admin.scss)
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const showBottomPaginationBar = showPagination && showBottomPagination && total > 0

  // Back to the last page when the current one is out of range (as EuiBasicTable does)
  useEffect(() => {
    if (showBottomPaginationBar && page > pageCount) {
      setPage(pageCount)
    }
  }, [showBottomPaginationBar, page, pageCount, setPage])

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
  const tableClassName = [
    "muiDatagrid__table",
    tableItems.length === 0 && "euiBasicTable--empty",
    actions && "muiDatagrid__table--hasActions",
  ]
    .filter(Boolean)
    .join(" ")

  // Screen reader sort announcement
  const getFieldLabel = useGetFieldLabel()
  const screenReaderSortAnnouncement = sortField
    ? translate(
        sortOrder === "asc" ? t.eui.grid.sorted_by_asc : t.eui.grid.sorted_by_desc,
        { field: getFieldLabel(resource, sortField) }
      )
    : null

  // Resized columns can make the table wider than its container (see ColumnResizer):
  // then its min width is the sum of the column widths, leaving some space to the actions.
  const tableMinWidth =
    columnWidths && Object.keys(columnWidths).length > 0
      ? (selectable ? SELECTION_COLUMN_WIDTH : 0) +
        (actions ? MIN_AUTO_COLUMN_WIDTH : 0) +
        columns.reduce(
          (sum, col) =>
            sum + (parsePixels(columnWidths[getColumnId(col)] ?? col.props.width) ?? 0),
          0
        )
      : undefined

  // Colors of the column resizers are set once here, instead of in every resizer
  const resizeStyle = resizableColumns
    ? {
        "--muiColumnResizerColor": euiTheme.border.color,
        "--muiColumnResizerActiveColor": euiTheme.colors.primary,
        "--muiDatagridMinWidth": tableMinWidth ? `${tableMinWidth}px` : undefined,
      }
    : undefined

  // Colors of the sticky selection and actions columns,
  // the same that EUI sets on the table and its rows
  const isDark = colorMode === "DARK"
  const stickyStyle = {
    "--muiDatagridBackgroundColor": euiTheme.colors.emptyShade,
    "--muiDatagridRowHoverColor": isDark
      ? euiTheme.colors.lightestShade
      : tint(euiTheme.colors.lightestShade, 0.5),
    "--muiDatagridRowSelectedColor": isDark
      ? shade(euiTheme.colors.primary, 0.7)
      : tint(euiTheme.colors.primary, 0.96),
    "--muiDatagridRowSelectedHoverColor": isDark
      ? shade(euiTheme.colors.primary, 0.75)
      : tint(euiTheme.colors.primary, 0.9),
    "--muiDatagridRowClickableHoverColor": transparentize(euiTheme.colors.primary, 0.05),
    "--muiDatagridRowClickableFocusColor": transparentize(euiTheme.colors.primary, 0.1),
  }

  return (
    <div style={{ ...stickyStyle, ...resizeStyle } as CSSProperties}>
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
      {showBottomPaginationBar && (
        <>
          <EuiSpacer size="m" />
          <EuiTablePagination
            activePage={page - 1}
            pageCount={pageCount}
            itemsPerPage={pageSize}
            itemsPerPageOptions={pageSizeOptions}
            showPerPageOptions={showPageSize}
            onChangePage={handleChangePage}
            onChangeItemsPerPage={handleChangePageSize}
          />
        </>
      )}
    </div>
  )
}
