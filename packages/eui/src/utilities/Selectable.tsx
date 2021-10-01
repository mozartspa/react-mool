import {
  EuiFilterButton,
  EuiFilterGroup,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopover,
  EuiSelectable,
  EuiSelectableOption,
  EuiText,
} from "@elastic/eui"
import { ReactNode, useMemo, useState } from "react"

export type SelectableOption<T = any> = {
  value: T
  label: string
  searchableLabel?: string
  disabled?: boolean
  prepend?: ReactNode
  append?: ReactNode
}

export type SelectableProps<T = any> = {
  options: SelectableOption<T>[]
  label?: string
  placeholder?: string
  searchable?: boolean
} & (
  | {
      multiple?: false
      value?: T
      onChange?: (value: T | undefined) => void
    }
  | {
      multiple: true
      value?: T[]
      onChange?: (values: T[]) => void
    }
)

export const Selectable = <T extends any>(props: SelectableProps<T>) => {
  const { options, label, placeholder, searchable, multiple, value, onChange } = props

  const [isPopoverOpen, setPopoverOpen] = useState(false)

  const openPopover = () => setPopoverOpen(true)

  const closePopover = () => setPopoverOpen(false)

  const selectOptionKeys = useMemo(() => {
    return options.map((o) => JSON.stringify(o.value))
  }, [options])

  const euiSelectableOptions = useMemo(() => {
    return options.map((o, index) => {
      const isChecked = Array.isArray(value) ? value.includes(o.value) : value === o.value
      const opt: EuiSelectableOption = {
        key: selectOptionKeys[index],
        label: o.label,
        searchableLabel: o.searchableLabel,
        disabled: o.disabled,
        prepend: o.prepend,
        append: o.append,
        checked: isChecked ? "on" : undefined,
      }
      return opt
    })
  }, [options, value, selectOptionKeys])

  const keyToOption = (key: string) => {
    const index = selectOptionKeys.indexOf(key)
    return index !== -1 ? options[index] : undefined
  }

  const handleChange = (options: EuiSelectableOption[]) => {
    if (props.multiple) {
      const selectedEuiOpts = options.filter((o) => o.checked === "on")
      const selectedValues = selectedEuiOpts
        .map((o) => keyToOption(o.key!))
        .filter(Boolean)
        .map((o) => o!.value)
      // Cast to any because TS cannot understand that if not `multiple` then `onChange` should accept a single item
      onChange?.(selectedValues as any)
    } else {
      const selectedKey = options.find((o) => o.checked === "on")?.key
      const newValue = selectedKey != null ? keyToOption(selectedKey)?.value : undefined
      // Cast to any because TS cannot understand that if not `multiple` then `onChange` should accept a single item
      onChange?.(newValue as any)
      closePopover()
    }
  }

  const selectedOptions = useMemo(() => {
    if (multiple) {
      if (Array.isArray(value)) {
        return options.filter((o) => value && value.includes && value.includes(o.value))
      } else {
        return []
      }
    } else {
      return options.find((o) => value === o.value)
    }
  }, [options, value, multiple])

  function renderSelectedOption(option: SelectableOption) {
    const { label, prepend, append } = option

    return (
      <EuiFlexGroup>
        {!!prepend && <EuiFlexItem grow={false}>{prepend}</EuiFlexItem>}
        <EuiFlexItem grow>{label}</EuiFlexItem>
        {!!append && <EuiFlexItem grow={false}>{append}</EuiFlexItem>}
      </EuiFlexGroup>
    )
  }

  function renderButton() {
    if (Array.isArray(selectedOptions)) {
      const isActive = selectedOptions.length > 0
      return (
        <EuiFilterButton
          iconType="arrowDown"
          hasActiveFilters={isActive}
          numActiveFilters={selectedOptions.length}
          numFilters={isActive ? options.length : 0}
          isSelected={isPopoverOpen}
          onClick={openPopover}
        >
          {label}
        </EuiFilterButton>
      )
    } else {
      return (
        <EuiFilterButton
          iconType="arrowDown"
          hasActiveFilters={false}
          onClick={openPopover}
        >
          {selectedOptions ? (
            renderSelectedOption(selectedOptions)
          ) : (
            <EuiText color="subdued" size="s">
              {placeholder}
            </EuiText>
          )}
        </EuiFilterButton>
      )
    }
  }

  return (
    <EuiFilterGroup fullWidth>
      <EuiPopover
        button={renderButton()}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        anchorPosition="downCenter"
      >
        <EuiSelectable
          options={euiSelectableOptions}
          searchable={searchable}
          singleSelection={!multiple}
          onChange={handleChange}
          style={{ minWidth: 240 }}
        >
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      </EuiPopover>
    </EuiFilterGroup>
  )
}
