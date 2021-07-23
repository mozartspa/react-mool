import {
  EuiButton,
  EuiButtonIcon,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectable,
  EuiSelectableOption,
  EuiTextAlign,
} from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { useCallback, useState } from "react"
import { t } from "../../i18n"

export type FilterBarButtonProps = {
  filterOptions: EuiSelectableOption[]
  onChange?: (options: EuiSelectableOption[]) => void
  onReset?: () => void
}

export const FilterBarButton = (props: FilterBarButtonProps) => {
  const { filterOptions, onChange, onReset } = props

  const [isPopoverOpen, setPopoverOpen] = useState(false)

  const translate = useTranslate()

  const button = (
    <EuiButtonIcon
      iconType="logstashFilter"
      color="primary"
      display="base"
      size="m"
      onClick={() => setPopoverOpen(true)}
      aria-label="Filter"
    />
  )

  const handleChange = useCallback(
    (options: EuiSelectableOption[]) => {
      setPopoverOpen(false)
      onChange?.(options)
    },
    [onChange]
  )

  const handleReset = useCallback(() => {
    onReset?.()
  }, [onReset])

  return (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={() => setPopoverOpen(false)}
      panelPaddingSize="none"
    >
      <EuiPopoverTitle paddingSize="s">
        <EuiTextAlign textAlign="center">{translate(t.eui.filter.title)}</EuiTextAlign>
      </EuiPopoverTitle>
      <EuiSelectable options={filterOptions} onChange={handleChange}>
        {(list) => <div style={{ width: 240 }}>{list}</div>}
      </EuiSelectable>
      <EuiPopoverFooter paddingSize="s">
        <EuiButton size="s" fullWidth onClick={handleReset}>
          Reset
        </EuiButton>
      </EuiPopoverFooter>
    </EuiPopover>
  )
}
