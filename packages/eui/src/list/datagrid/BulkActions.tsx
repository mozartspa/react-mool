import {
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiPopover,
} from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { useState } from "react"
import { t } from "../../i18n"
import { DatagridAction } from "./types"

function isActionEnabled<TRecord = any>(
  action: DatagridAction,
  selectedItems: TRecord[]
) {
  if (selectedItems.length === 0) {
    return false
  }
  if (action.available && !selectedItems.every((item) => action.available!(item))) {
    return false
  }
  if (action.enabled && !selectedItems.every((item) => action.enabled!(item))) {
    return false
  }

  return true
}

export type BulkActions<TRecord = any> = {
  actions: DatagridAction<TRecord>[]
  selectedItems: TRecord[]
}

export const BulkActions = (props: BulkActions) => {
  const { actions, selectedItems } = props

  const [isOpen, setOpen] = useState(false)
  const translate = useTranslate()

  const button = (
    <EuiButtonEmpty
      iconType="arrowDown"
      iconSide="right"
      size="xs"
      onClick={() => setOpen(!isOpen)}
      disabled={actions.length === 0}
    >
      {translate(t.eui.bulk.actions)}
    </EuiButtonEmpty>
  )

  const items = actions.map((action, i) => {
    const enabled = isActionEnabled(action, selectedItems)

    return (
      <EuiContextMenuItem
        key={i}
        icon={action.icon || "empty"}
        disabled={!enabled}
        onClick={() => {
          setOpen(false)
          action.run(selectedItems)
        }}
      >
        {action.bulkName ?? (action.name as string)}
      </EuiContextMenuItem>
    )
  })

  return (
    <EuiPopover
      button={button}
      isOpen={isOpen}
      closePopover={() => setOpen(false)}
      panelPaddingSize="none"
    >
      <EuiContextMenuPanel items={items} />
    </EuiPopover>
  )
}
