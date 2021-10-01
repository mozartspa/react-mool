import { EuiSuperSelect, EuiSuperSelectOption } from "@elastic/eui"
import { ReactNode, useCallback, useMemo } from "react"

export type SelectOption<T = any> = {
  value: T
  disabled?: boolean
  inputDisplay?: ReactNode
  dropdownDisplay?: ReactNode
}

export type SelectProps<T = any> = {
  options: SelectOption<T>[]
  placeholder?: string
  value?: T
  onChange?: (value: T | undefined) => void
}

export const Select = <T extends any>(props: SelectProps<T>) => {
  const { options, /*placeholder,*/ value, onChange } = props

  const optionKeys = useMemo(() => {
    return options.map((o) => JSON.stringify(o.value))
  }, [options])

  const euiSuperSelectOptions = useMemo(() => {
    return options.map((o, index) => {
      const value = optionKeys[index]
      const inputDisplay = o.inputDisplay ?? value
      const dropdownDisplay = inputDisplay
      const opt: EuiSuperSelectOption<string> = {
        disabled: o.disabled,
        value,
        inputDisplay,
        dropdownDisplay,
      }
      return opt
    })
  }, [options, value, optionKeys])

  const keyToOption = useCallback(
    (key: string) => {
      const index = optionKeys.indexOf(key)
      return index !== -1 ? options[index] : undefined
    },
    [optionKeys]
  )

  const valueOfSelected = JSON.stringify(value)

  const handleChange = useCallback(
    (value: string) => {
      const optionValue = keyToOption(value)?.value
      onChange?.(optionValue)
    },
    [keyToOption, onChange]
  )

  return (
    <EuiSuperSelect
      placeholder="STICAAZZI"
      options={euiSuperSelectOptions}
      valueOfSelected={valueOfSelected}
      onChange={handleChange}
    />
  )

  /*const handleChange = (options: EuiSelectableOption[]) => {
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
  )*/
}
