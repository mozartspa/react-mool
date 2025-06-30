import {
  EuiButton,
  EuiButtonIcon,
  EuiIcon,
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
  onSelect?: (option: EuiSelectableOption) => void
  onReset?: () => void
  searchable?: boolean
}

export const FilterBarButton = (props: FilterBarButtonProps) => {
  const { filterOptions, onSelect, onReset, searchable } = props

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

  const options = filterOptions.map(
    (filter): EuiSelectableOption => ({
      ...filter,
      prepend: <EuiIcon type="plusInCircleFilled" />,
    })
  )

  const setOptions = (options: EuiSelectableOption[]) => {
    const selectedOptions = options.filter((option) => option.checked === "on")
    if (selectedOptions.length > 0) {
      setPopoverOpen(false)
      onSelect?.(selectedOptions[0])
    }
  }

  return (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={() => setPopoverOpen(false)}
      panelPaddingSize="none"
      repositionOnScroll
    >
      {options.length > 0 && (
        <EuiPopoverTitle paddingSize="s">
          <EuiTextAlign textAlign="center">
            {translate(t.eui.filter.add_filter)}
          </EuiTextAlign>
        </EuiPopoverTitle>
      )}

      <div style={{ width: 240, maxBlockSize: "300px", overflow: "hidden auto" }}>
        <EuiSelectable
          options={options}
          onChange={(options) => setOptions(options)}
          searchable={searchable}
          listProps={{
            isVirtualized: false,
            showIcons: false,
          }}
          height={searchable ? 240 : undefined}
        >
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      </div>

      <EuiPopoverFooter paddingSize="s">
        <EuiButton size="s" fullWidth onClick={handleReset}>
          {translate(t.eui.filter.reset_filters)}
        </EuiButton>
      </EuiPopoverFooter>
    </EuiPopover>
  )
}
