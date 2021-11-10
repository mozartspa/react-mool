import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHideFor,
  EuiTablePagination,
  EuiText,
} from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { CSSProperties, ReactNode } from "react"
import { t } from "../../i18n"
import { BulkActions } from "./BulkActions"
import { DatagridAction } from "./types"

function getShowingRange(page: number, pageSize: number, total: number) {
  if (page <= 1) {
    const value = Math.min(pageSize, total)
    return `${value}`
  } else {
    const from = (page - 1) * pageSize + 1
    const to = Math.min(from + pageSize - 1, total)
    return `${from}-${to}`
  }
}

export type ToolbarProps<TRecord = any> = {
  total: number
  page: number
  pageSize: number
  selectedItems: TRecord[]
  bulkActions?: DatagridAction<TRecord>[]
  actions?: ReactNode[]
  onChangePage?: (page: number) => void
  showBulkActions?: boolean
  showPagination?: boolean
  showSelectedCount?: boolean
}

export const Toolbar = (props: ToolbarProps) => {
  const {
    total,
    page,
    pageSize,
    selectedItems,
    bulkActions = [],
    actions = [],
    onChangePage,
    showBulkActions = true,
    showPagination = true,
    showSelectedCount = true,
  } = props

  const translate = useTranslate()

  const showingLabel = translate(t.eui.grid.showing, {
    count: getShowingRange(page, pageSize, total),
    total,
  })

  const selectedLabel = translate(t.eui.grid.selected)
  const selectedCount = selectedItems.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  // hide pagination in case of no items
  const paginationStyle: CSSProperties | undefined =
    total > 0 ? undefined : { visibility: "hidden" }

  return (
    <EuiFlexGroup alignItems="center" responsive={true}>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup alignItems="center" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiText color="subdued" size="xs">
              <span style={{ whiteSpace: "nowrap" }}>{showingLabel}</span>
              {showSelectedCount && (
                <span style={{ paddingLeft: 8, paddingRight: 8 }}>|</span>
              )}
              {showSelectedCount && (
                <span style={{ whiteSpace: "nowrap" }}>
                  {selectedLabel}{" "}
                  {selectedCount === 0 ? "0" : <strong>{selectedCount}</strong>}
                </span>
              )}
            </EuiText>
          </EuiFlexItem>

          {showBulkActions && (
            <EuiFlexItem grow={false}>
              <BulkActions actions={bulkActions} selectedItems={selectedItems} />
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
      </EuiFlexItem>

      {actions.map((action, i) => (
        <EuiFlexItem key={i} grow={true}>
          {action}
        </EuiFlexItem>
      ))}

      {showPagination && (
        <EuiHideFor sizes={["xs"]}>
          <EuiFlexItem grow={true} style={paginationStyle}>
            <EuiTablePagination
              activePage={page - 1}
              pageCount={pageCount}
              hidePerPageOptions={true}
              onChangePage={onChangePage}
            />
          </EuiFlexItem>
        </EuiHideFor>
      )}
    </EuiFlexGroup>
  )
}
