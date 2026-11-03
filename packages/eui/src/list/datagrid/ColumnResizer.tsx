import { KeyboardEvent, PointerEvent, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const MIN_COLUMN_WIDTH = 50
const MAX_COLUMN_WIDTH = 2000
const KEYBOARD_STEP = 10

/** Space left to the columns without a width (eg. the actions), before the table grows */
export const MIN_AUTO_COLUMN_WIDTH = 100

export type ColumnWidths = Record<string, string | undefined>

type AutoColumn = {
  cell: HTMLElement
  id: string
  minWidth: number
  prevStyleWidth: string
}

/** Layout of the table when the resize starts */
type TableLayout = {
  table: HTMLTableElement
  prevTableMinWidth: string
  containerWidth: number
  /** Width of the other columns with a width in pixels (eg. the selection) */
  fixedWidth: number
  /** Minimum width of the other columns, without a width in pixels */
  autoMinWidth: number
  /** Resizable columns without a width in pixels: they get one when the table grows */
  autoColumns: AutoColumn[]
}

type DragState = {
  startX: number
  startWidth: number
  prevStyleWidth: string
  layout: TableLayout
  width: number
  frame: number
}

export type ColumnResizerProps = {
  columnId: string
  label: string
  /**
   * Called with the new widths (eg. "180px"), by column id.
   * A width is `undefined` when the default one has to be restored.
   */
  onResize: (widths: ColumnWidths) => void
}

/**
 * Handle to resize a column of EuiBasicTable, which has no native support for it.
 *
 * It's rendered inside the column header, but the header content may be inside
 * the sort button: a focusable element can't be nested in a button, so the handle
 * is rendered in a portal directly inside the `th`.
 *
 * A column grows taking space from the columns without a width, down to their minimum
 * width: then the table grows too (and scrolls), and those columns keep their width.
 *
 * While dragging, widths are applied directly to the DOM (at most once per frame)
 * without re-rendering: the table is re-rendered only once, when they are committed.
 * With the fixed table layout, the browser only needs the header to lay out the columns.
 */
export const ColumnResizer = (props: ColumnResizerProps) => {
  const { columnId, label, onResize } = props

  const anchorRef = useRef<HTMLSpanElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState>()
  const [cell, setCell] = useState<HTMLTableCellElement | null>(null)

  // Only the desktop header renders a `th`: elsewhere (eg. mobile layout) no handle is shown
  useLayoutEffect(() => {
    setCell(anchorRef.current?.closest("th") ?? null)
  }, [])

  const getWidth = (element: Element) => Math.round(element.getBoundingClientRect().width)

  const clamp = (width: number) =>
    Math.min(MAX_COLUMN_WIDTH, Math.max(MIN_COLUMN_WIDTH, Math.round(width)))

  // The width exposed to assistive technologies, refreshed when it can have changed
  const updateValue = (width = cell ? getWidth(cell) : 0) => {
    handleRef.current?.setAttribute("aria-valuenow", String(width))
  }

  useLayoutEffect(() => {
    if (cell) {
      updateValue()
    }
  }, [cell])

  const getTableLayout = (): TableLayout | undefined => {
    const table = cell?.closest("table")
    const container = table?.parentElement
    if (!cell || !cell.parentElement || !table || !container) return

    const layout: TableLayout = {
      table,
      prevTableMinWidth: table.style.minWidth,
      containerWidth: container.clientWidth,
      fixedWidth: 0,
      autoMinWidth: 0,
      autoColumns: [],
    }

    for (const other of Array.from(cell.parentElement.children) as HTMLElement[]) {
      if (other === cell) continue

      const width = getWidth(other)
      const styleWidth = other.style.width
      const resizer = other.querySelector<HTMLElement>(
        ":scope > .muiDatagrid__columnResizer"
      )
      const id = resizer?.dataset.columnId

      // The selection column has a fixed width, the others when it's set in pixels
      // (EuiBasicTable converts unitless widths to pixels)
      if (
        styleWidth.endsWith("px") ||
        other.classList.contains("euiTableHeaderCellCheckbox") ||
        (styleWidth && !id)
      ) {
        layout.fixedWidth += width
      } else if (id) {
        // Columns without a width shrink down to a min width, while the relative ones
        // (eg. "20%") keep their current width. When the table grows they get it in pixels,
        // otherwise they would grow with the table.
        const minWidth = styleWidth ? width : Math.min(MIN_AUTO_COLUMN_WIDTH, width)
        layout.autoMinWidth += minWidth
        layout.autoColumns.push({ cell: other, id, minWidth, prevStyleWidth: styleWidth })
      } else {
        // Eg. the actions
        layout.autoMinWidth += MIN_AUTO_COLUMN_WIDTH
      }
    }

    return layout
  }

  /** Applies the width to the DOM, returns whether the table has grown */
  const applyWidth = (width: number, layout: TableLayout) => {
    const tableWidth = width + layout.fixedWidth + layout.autoMinWidth
    const grows = tableWidth > layout.containerWidth

    if (cell) {
      cell.style.width = `${width}px`
    }
    layout.table.style.minWidth = grows ? `${tableWidth}px` : layout.prevTableMinWidth
    layout.autoColumns.forEach((column) => {
      column.cell.style.width = grows ? `${column.minWidth}px` : column.prevStyleWidth
    })
    updateValue(width)

    return grows
  }

  const restoreLayout = (layout: TableLayout) => {
    layout.table.style.minWidth = layout.prevTableMinWidth
    layout.autoColumns.forEach((column) => {
      column.cell.style.width = column.prevStyleWidth
    })
  }

  const commit = (width: number, layout: TableLayout) => {
    const grows = applyWidth(width, layout)

    // When the table grows, the other columns keep the width they have now
    const widths: ColumnWidths = { [columnId]: `${width}px` }
    if (grows) {
      layout.autoColumns.forEach((column) => {
        widths[column.id] = `${column.minWidth}px`
      })
    }
    onResize(widths)

    // The table min width is computed by the Datagrid from the stored widths:
    // the inline one is removed once it has re-rendered
    requestAnimationFrame(() => {
      layout.table.style.minWidth = layout.prevTableMinWidth
    })
  }

  const endDrag = (shouldCommit: boolean) => {
    const drag = dragRef.current
    if (!drag || !cell) return

    dragRef.current = undefined
    cancelAnimationFrame(drag.frame)

    if (shouldCommit && drag.width !== drag.startWidth) {
      commit(drag.width, drag.layout)
    } else {
      cell.style.width = drag.prevStyleWidth
      restoreLayout(drag.layout)
      updateValue()
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const layout = getTableLayout()
    if (!cell || !layout || event.button !== 0) return

    // Don't select text, nor let the event reach the sort button
    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)

    const startWidth = getWidth(cell)
    dragRef.current = {
      startX: event.clientX,
      startWidth,
      prevStyleWidth: cell.style.width,
      layout,
      width: startWidth,
      frame: 0,
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return

    drag.width = clamp(drag.startWidth + event.clientX - drag.startX)
    if (!drag.frame) {
      drag.frame = requestAnimationFrame(() => {
        drag.frame = 0
        applyWidth(drag.width, drag.layout)
      })
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === "ArrowRight"
        ? KEYBOARD_STEP
        : event.key === "ArrowLeft"
        ? -KEYBOARD_STEP
        : 0
    const layout = getTableLayout()
    if (step && cell && layout) {
      event.preventDefault()
      event.stopPropagation()
      commit(clamp(getWidth(cell) + step), layout)
    }
  }

  return (
    <>
      <span ref={anchorRef} hidden />
      {cell &&
        createPortal(
          <div
            ref={handleRef}
            className="muiDatagrid__columnResizer"
            data-column-id={columnId}
            role="separator"
            aria-orientation="vertical"
            aria-label={label}
            aria-valuemin={MIN_COLUMN_WIDTH}
            aria-valuemax={MAX_COLUMN_WIDTH}
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={() => endDrag(true)}
            // Also fired after pointercancel, or when the capture is lost for any other reason
            onLostPointerCapture={() => endDrag(false)}
            onFocus={() => updateValue()}
            onKeyDown={handleKeyDown}
            // Events bubble through the React tree even from a portal:
            // don't let them reach the sort button.
            onClick={(event) => event.stopPropagation()}
            onDoubleClick={(event) => {
              event.stopPropagation()
              onResize({ [columnId]: undefined })
            }}
          />,
          cell
        )}
    </>
  )
}
