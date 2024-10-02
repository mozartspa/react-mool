import {
  DropResult,
  EuiButton,
  EuiButtonEmpty,
  EuiDragDropContext,
  euiDragDropReorder,
  EuiDraggable,
  EuiDroppable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPopover,
  EuiPopoverFooter,
  EuiSwitch,
} from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode, useState } from "react"
import { t } from "../../i18n"

export type ColumnSelectorProps = {
  orderedColumnIds: string[]
  visibleColumnIds: string[]
  columnLabel?: (columnId: string) => ReactNode
  onChangeVisibility?: (columnId: string, visible: boolean) => void
  onChangeOrder?: (columnIds: string[]) => void
  onReset?: () => void
}

export const ColumnSelector = (props: ColumnSelectorProps) => {
  const {
    orderedColumnIds,
    visibleColumnIds,
    columnLabel,
    onChangeVisibility,
    onChangeOrder,
    onReset,
  } = props

  const translate = useTranslate()
  const [isOpen, setOpen] = useState(false)

  const onDragEnd = ({ source: { index: sourceIndex }, destination }: DropResult) => {
    if (destination) {
      const destinationIndex = destination.index
      const nextOrderedColumnIds = euiDragDropReorder(
        orderedColumnIds,
        sourceIndex,
        destinationIndex
      )
      onChangeOrder?.(nextOrderedColumnIds)
    }
  }

  return (
    <EuiPopover
      isOpen={isOpen}
      closePopover={() => setOpen(false)}
      anchorPosition="downLeft"
      panelPaddingSize="s"
      panelClassName="euiDataGridColumnSelectorPopover"
      button={
        <EuiButtonEmpty
          size="xs"
          iconType="tableDensityNormal"
          onClick={() => setOpen(!isOpen)}
          flush="left"
        >
          {translate(t.eui.columns.manage)}
        </EuiButtonEmpty>
      }
    >
      <div className="euiDataGrid__controlScroll">
        <EuiDragDropContext onDragEnd={onDragEnd}>
          <EuiDroppable droppableId="columnOrder" spacing="m">
            <>
              {orderedColumnIds.map((id, index) => {
                const label = columnLabel?.(id) ?? id
                return (
                  <EuiDraggable
                    key={id}
                    draggableId={id}
                    index={index}
                    spacing="m"
                    usePortal
                  >
                    {(_, state) => (
                      <div
                        className={`euiDataGridColumnSelector__item ${
                          state.isDragging && "euiDataGridColumnSelector__item-isDragging"
                        }`}
                      >
                        <EuiFlexGroup
                          responsive={false}
                          gutterSize="m"
                          alignItems="center"
                        >
                          <EuiFlexItem>
                            <EuiSwitch
                              label={label}
                              checked={visibleColumnIds.includes(id)}
                              compressed
                              onChange={(event) => {
                                onChangeVisibility?.(id, event.target.checked)
                              }}
                            />
                          </EuiFlexItem>
                          <EuiFlexItem grow={false}>
                            <EuiIcon type="grab" color="subdued" />
                          </EuiFlexItem>
                        </EuiFlexGroup>
                      </div>
                    )}
                  </EuiDraggable>
                )
              })}
            </>
          </EuiDroppable>
        </EuiDragDropContext>
      </div>

      <EuiPopoverFooter paddingSize="s">
        <EuiButton size="s" onClick={onReset} fullWidth>
          {translate(t.eui.columns.reset)}
        </EuiButton>
      </EuiPopoverFooter>
    </EuiPopover>
  )
}
