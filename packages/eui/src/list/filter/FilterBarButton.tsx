import {
  EuiButton,
  EuiButtonIcon,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectableOption,
  EuiTextAlign,
} from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { useCallback, useState } from "react"
import { t } from "../../i18n"

export type FilterBarButtonProps = {
  filterOptions: EuiSelectableOption[]
  onSelect?: (option: EuiSelectableOption) => void
  onReset?: () => void
}

export const FilterBarButton = (props: FilterBarButtonProps) => {
  const { filterOptions, onSelect, onReset } = props

  const [isPopoverOpen, setPopoverOpen] = useState(false)

  const translate = useTranslate()

  const handleReset = useCallback(() => {
    setPopoverOpen(false)
    onReset?.()
  }, [onReset])

  const button = (
    <EuiButtonIcon
      iconType="logstashFilter"
      color="primary"
      display="base"
      size="m"
      onClick={() => setPopoverOpen(!isPopoverOpen)}
      aria-label={translate(t.eui.filter.toggle_filter_menu)}
    />
  )

  const items = filterOptions.map((filter) => (
    <EuiContextMenuItem
      key={filter.key}
      icon="plusInCircleFilled"
      onClick={() => {
        setPopoverOpen(false)
        onSelect?.(filter)
      }}
    >
      {filter.label}
    </EuiContextMenuItem>
  ))

  return (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={() => setPopoverOpen(false)}
      panelPaddingSize="none"
      repositionOnScroll
    >
      {items.length > 0 && (
        <EuiPopoverTitle paddingSize="s">
          <EuiTextAlign textAlign="center">
            {translate(t.eui.filter.add_filter)}
          </EuiTextAlign>
        </EuiPopoverTitle>
      )}

      <div style={{ width: 240, maxBlockSize: "300px", overflow: "hidden auto" }}>
        <EuiContextMenuPanel size="s" items={items} />
      </div>

      <EuiPopoverFooter paddingSize="s">
        <EuiButton size="s" fullWidth onClick={handleReset}>
          {translate(t.eui.filter.reset_filters)}
        </EuiButton>
      </EuiPopoverFooter>
    </EuiPopover>
  )
}
