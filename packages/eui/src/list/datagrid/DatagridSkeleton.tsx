import {
  EuiBasicTableColumn,
  EuiFlexGroup,
  EuiSkeletonCircle,
  EuiSkeletonText,
  EuiTableSelectionType,
} from "@elastic/eui"

// Number of placeholder rows shown while loading the first page
const MAX_SKELETON_ROWS = 10

// Widths of the skeleton lines, cycled to avoid a too regular look
const SKELETON_WIDTHS = ["80%", "55%", "70%", "45%", "65%"]

export type SkeletonItem = { __skeleton: number }

export function isSkeletonItem(item: object): item is SkeletonItem {
  return "__skeleton" in item
}

export function getSkeletonItemId(item: SkeletonItem) {
  return `skeleton-${item.__skeleton}`
}

export function getSkeletonItems(pageSize: number): SkeletonItem[] {
  return Array.from({ length: Math.min(pageSize, MAX_SKELETON_ROWS) }, (_, i) => ({
    __skeleton: i,
  }))
}

// Selection checkboxes are shown (to keep the layout), but disabled
export const skeletonSelection: EuiTableSelectionType<any> = {
  selectable: () => false,
}

export function toSkeletonColumns(columns: EuiBasicTableColumn<any>[]) {
  return columns.map(toSkeletonColumn)
}

function toSkeletonColumn(
  column: EuiBasicTableColumn<any>,
  columnIndex: number
): EuiBasicTableColumn<any> {
  if ("actions" in column) {
    // Mimic EuiBasicTable: more than 2 actions are collapsed in a single button,
    // next to the primary ones
    const { actions } = column
    const buttonCount =
      actions.length <= 2
        ? actions.length
        : actions.filter((action) => action.isPrimary).length + 1

    return {
      name: column.name,
      width: column.width,
      align: "right",
      render: () => (
        <EuiFlexGroup gutterSize="s" justifyContent="flexEnd" responsive={false}>
          {Array.from({ length: buttonCount }, (_, i) => (
            <EuiSkeletonCircle key={i} size="s" />
          ))}
        </EuiFlexGroup>
      ),
    }
  }

  const renderCell = (item: SkeletonItem) => {
    const width =
      SKELETON_WIDTHS[(item.__skeleton + columnIndex) % SKELETON_WIDTHS.length]
    return (
      <div className="muiDatagrid__skeletonCell" style={{ width }}>
        <EuiSkeletonText lines={1} size="s" />
      </div>
    )
  }

  // Field columns receive (value, item), computed columns receive (item)
  if ("field" in column) {
    return {
      ...column,
      render: (_value: unknown, item: SkeletonItem) => renderCell(item),
    }
  } else {
    return { ...column, render: renderCell }
  }
}
