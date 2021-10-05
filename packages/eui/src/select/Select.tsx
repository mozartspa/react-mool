import {
  EuiFilterButton,
  EuiFilterGroup,
  EuiInputPopover,
  EuiPopover,
  EuiPopoverProps,
  EuiSelectable,
  EuiSelectableOption,
  EuiSelectableOptionsListProps,
  EuiText,
} from "@elastic/eui"
import { ReactNode, useMemo, useState } from "react"
import { SelectOptionList } from "./SelectOptionList"

const DEFAULT_EMPTY_VALUE = () => undefined

export type SelectOption<T = any> = {
  value: T
  label: string
  searchableLabel?: string
  disabled?: boolean
  inputDisplay?: ReactNode
  dropdownDisplay?: ReactNode
}

export type SelectProps<T = any> = {
  options: SelectOption<T>[]
  label?: ReactNode
  placeholder?: string
  searchable?: boolean
  popoverMode?: "attached" | "detached"
  popoverProps?: Partial<EuiPopoverProps>
  emptyValue?: () => T | null | undefined
  hasDividers?: boolean
  fullWidth?: boolean
  style?: React.CSSProperties
  className?: string
  searchListProps?: Partial<EuiSelectableOptionsListProps>
  onBlur?: () => void
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

export const Select = <T extends any>(props: SelectProps<T>) => {
  const {
    options,
    label,
    placeholder,
    searchable,
    popoverMode = props.searchable ? "detached" : "attached",
    popoverProps,
    multiple,
    value,
    emptyValue = DEFAULT_EMPTY_VALUE,
    hasDividers,
    fullWidth,
    style,
    className,
    searchListProps,
    onChange,
    onBlur,
  } = props

  const [isPopoverOpen, setPopoverOpen] = useState(false)

  const openPopover = () => setPopoverOpen(true)

  const closePopover = () => {
    setPopoverOpen(false)
    onBlur?.()
  }

  // options keys
  const selectOptionKeys = useMemo(() => {
    return options.map((o) => JSON.stringify(o.value))
  }, [options])

  // options for EuiSelectable
  const selectableOptions = useMemo(() => {
    return options.map((o, index) => {
      const isChecked = Array.isArray(value) ? value.includes(o.value) : value === o.value
      const opt: EuiSelectableOption = {
        key: selectOptionKeys[index],
        label: o.label,
        searchableLabel: o.searchableLabel,
        disabled: o.disabled,
        checked: isChecked ? "on" : undefined,
      }
      return opt
    })
  }, [options, value, selectOptionKeys])

  // selected options
  const selectedOptions = useMemo(() => {
    if (multiple) {
      return options.filter(
        (o) => Array.isArray(value) && value.includes && value.includes(o.value)
      )
    } else {
      return options.find((o) => value === o.value)
    }
  }, [options, value, multiple])

  // selected option values
  const selectedOptionValues = useMemo(() => {
    if (Array.isArray(selectedOptions)) {
      return selectedOptions.map((o) => o.value)
    } else if (selectedOptions != null) {
      return [selectedOptions.value]
    } else {
      return []
    }
  }, [selectedOptions])

  const keyToOptionValue = (key: string) => {
    const index = selectOptionKeys.indexOf(key)
    const value = index !== -1 ? options[index].value : emptyValue()
    return value
  }

  const handleSelectableChange = (options: EuiSelectableOption[]) => {
    if (props.multiple) {
      const newValue = options
        .filter((o) => o.checked === "on")
        .map((o) => keyToOptionValue(o.key!))
      // Cast to any because TS cannot understand that if not `multiple` then `onChange` should accept a single item
      onChange?.(newValue as any)
    } else {
      const selectedKey = options.find((o) => o.checked === "on")?.key
      const newValue = selectedKey != null ? keyToOptionValue(selectedKey) : emptyValue()
      // Cast to any because TS cannot understand that if not `multiple` then `onChange` should accept a single item
      onChange?.(newValue as any)
      closePopover()
    }
  }

  const handleOptionChange = (option: SelectOption, selected: boolean) => {
    if (multiple) {
      let newValue = Array.isArray(value) ? [...value] : []
      if (selected) {
        newValue = [...newValue, option.value]
      } else {
        newValue = newValue.filter((o) => o !== option.value)
      }
      // Cast to any because TS cannot understand that if not `multiple` then `onChange` should accept a single item
      onChange?.(newValue as any)
    } else {
      onChange?.(selected ? option.value : emptyValue())
      closePopover()
    }
  }

  function renderSelectedOption(option: SelectOption) {
    const { label, inputDisplay } = option
    return inputDisplay || label
  }

  function renderButton() {
    if (Array.isArray(selectedOptions)) {
      const isActive = selectedOptions.length > 0
      return (
        <EuiFilterGroup fullWidth>
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
        </EuiFilterGroup>
      )
    } else {
      return (
        <EuiFilterGroup fullWidth>
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
        </EuiFilterGroup>
      )
    }
  }

  function renderContent() {
    if (searchable) {
      return (
        <EuiSelectable
          options={selectableOptions}
          searchable={searchable}
          singleSelection={!multiple}
          onChange={handleSelectableChange}
          listProps={{ onFocusBadge: false, ...searchListProps }}
        >
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      )
    } else {
      return (
        <SelectOptionList
          options={options}
          selectedValues={selectedOptionValues}
          onOptionChange={handleOptionChange}
          hasDividers={hasDividers}
        />
      )
    }
  }

  if (popoverMode === "attached") {
    return (
      <EuiInputPopover
        input={renderButton()}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        fullWidth={fullWidth}
        style={style}
        className={className}
        {...popoverProps}
      >
        {renderContent()}
      </EuiInputPopover>
    )
  } else {
    return (
      <EuiPopover
        button={renderButton()}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        display={fullWidth ? "block" : "inlineBlock"}
        style={style}
        className={className}
        {...popoverProps}
      >
        {renderContent()}
      </EuiPopover>
    )
  }
}
