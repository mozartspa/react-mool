import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHideFor,
  EuiTablePagination,
  EuiText,
} from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { t } from "../../i18n"
import { DatagridAction } from "./actions"
import { BulkActions } from "./BulkActions"

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
  onChangePage?: (page: number) => void
}

export const Toolbar = (props: ToolbarProps) => {
  const { total, page, pageSize, selectedItems, bulkActions = [], onChangePage } = props

  const translate = useTranslate()

  const showingLabel = translate(t.eui.grid.showing, {
    count: getShowingRange(page, pageSize, total),
    total,
  })

  const selectedLabel = translate(t.eui.grid.selected)
  const selectedCount = selectedItems.length
  const pageCount = Math.ceil(total / pageSize)

  return (
    <EuiFlexGroup alignItems="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiText color="subdued" size="xs">
          <span style={{ whiteSpace: "nowrap" }}>{showingLabel}</span>
          <span style={{ paddingLeft: 8, paddingRight: 8 }}>|</span>
          <span style={{ whiteSpace: "nowrap" }}>
            {selectedLabel} {selectedCount === 0 ? "0" : <strong>{selectedCount}</strong>}
          </span>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <BulkActions actions={bulkActions} selectedItems={selectedItems} />
      </EuiFlexItem>

      <EuiHideFor sizes={["xs"]}>
        <EuiFlexItem grow={true}>
          <EuiTablePagination
            activePage={page - 1}
            pageCount={pageCount}
            hidePerPageOptions={true}
            onChangePage={onChangePage}
          />
        </EuiFlexItem>
      </EuiHideFor>
    </EuiFlexGroup>
  )
}
