import {
  EuiFilterButton,
  EuiFilterGroup,
  EuiInputPopover,
  EuiPopover,
  EuiPopoverProps,
  EuiSelectable,
  EuiSelectableOption,
  EuiSelectableOptionsListProps,
  EuiSelectableProps,
  EuiText,
} from "@elastic/eui"
import { ReactNode, useMemo, useState } from "react"
import { SelectOptionList } from "./SelectOptionList"

const DEFAULT_EMPTY_VALUE = () => undefined

const SELECT_ALL_KEY = "$$$__SELECT_ALL__&&&"

export type SelectOption<T = any> = {
  value: T
  label: string
  searchableLabel?: string
  disabled?: boolean
  inputDisplay?: ReactNode
  dropdownDisplay?: ReactNode
  append?: ReactNode
  prepend?: ReactNode
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
  isDisabled?: boolean
  isLoading?: boolean
  renderSearchOption?: (opt: SelectOption<T>, searchValue: string) => ReactNode
  selectAll?: string
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
    renderSearchOption,
    onChange,
    onBlur,
    isDisabled,
    isLoading,
    selectAll,
  } = props

  const [isPopoverOpen, setPopoverOpen] = useState(false)

  const hasSelectAll = multiple && selectAll ? true : false

  const togglePopover = () => setPopoverOpen((val) => !val)

  const closePopover = () => {
    setPopoverOpen(false)
    onBlur?.()
  }

  // options keys
  const selectOptionKeys = useMemo(() => {
    return options.map((o) => JSON.stringify(o.value))
  }, [options])

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

  // select option list options
  const selectOptionsListOptions = useMemo(() => {
    if (hasSelectAll && selectAll) {
      const selectAllOption: SelectOption = {
        label: selectAll,
        value: SELECT_ALL_KEY,
      }
      return [selectAllOption, ...options]
    } else {
      return options
    }
  }, [options, hasSelectAll, selectAll])

  const isSelectedAll =
    Array.isArray(selectedOptions) && selectedOptions.length === options.length

  // options for EuiSelectable
  const selectableOptions = useMemo(() => {
    const opts = options.map((o, index) => {
      const isChecked = Array.isArray(value) ? value.includes(o.value) : value === o.value
      const opt: EuiSelectableOption = {
        key: selectOptionKeys[index],
        label: o.label,
        searchableLabel: o.searchableLabel,
        disabled: o.disabled,
        checked: isChecked ? "on" : undefined,
        append: o.append,
        prepend: o.prepend,
        data: {
          __original: o,
        },
      }
      return opt
    })

    if (hasSelectAll && selectAll) {
      opts.splice(0, 0, {
        key: SELECT_ALL_KEY,
        label: selectAll,
        checked: isSelectedAll ? "on" : undefined,
      })
    }

    return opts
  }, [options, value, selectOptionKeys, hasSelectAll, selectAll, isSelectedAll])

  const onChangeSafe = (
    valueOrValues: T | (T | null | undefined)[] | null | undefined
  ) => {
    // Cast to any because TS cannot understand that if not `multiple` then `onChange` should accept a single item
    onChange?.(valueOrValues as any)
  }

  // selected option values
  const selectedOptionValues = useMemo(() => {
    let values: T[] = []
    if (Array.isArray(selectedOptions)) {
      values = selectedOptions.map((o) => o.value)
    } else if (selectedOptions != null) {
      values = [selectedOptions.value]
    } else {
      values = []
    }

    if (hasSelectAll && isSelectedAll) {
      values.push(SELECT_ALL_KEY as T)
    }

    return values
  }, [selectedOptions, hasSelectAll, isSelectedAll])

  const keyToOptionValue = (key: string) => {
    const index = selectOptionKeys.indexOf(key)
    const value = index !== -1 ? options[index].value : emptyValue()
    return value
  }

  const handleSelectableChange = (nextOptions: EuiSelectableOption[]) => {
    if (props.multiple) {
      const wasSelectedAllChecked =
        !isSelectedAll &&
        nextOptions.find((o) => o.key === SELECT_ALL_KEY)?.checked === "on"

      const wasSelectedAllUnchecked =
        isSelectedAll &&
        nextOptions.find((o) => o.key === SELECT_ALL_KEY)?.checked !== "on"

      if (wasSelectedAllChecked) {
        const newValue = options.map((o) => o.value)
        onChangeSafe(newValue)
      } else if (wasSelectedAllUnchecked) {
        onChangeSafe([])
      } else {
        const newValue = nextOptions
          .filter((o) => o.checked === "on" && o.key !== SELECT_ALL_KEY)
          .map((o) => keyToOptionValue(o.key!))
        onChangeSafe(newValue)
      }
    } else {
      const selectedKey = nextOptions.find((o) => o.checked === "on")?.key
      const newValue = selectedKey != null ? keyToOptionValue(selectedKey) : emptyValue()
      onChangeSafe(newValue)
      closePopover()
    }
  }

  const handleOptionChange = (option: SelectOption, selected: boolean) => {
    if (multiple) {
      let newValue = Array.isArray(value) ? [...value] : []

      const wasSelectedAllChecked = option.value === SELECT_ALL_KEY && selected
      const wasSelectedAllUnchecked = option.value === SELECT_ALL_KEY && !selected

      if (wasSelectedAllChecked) {
        newValue = options.map((o) => o.value)
      } else if (wasSelectedAllUnchecked) {
        newValue = []
      } else if (selected) {
        newValue = [...newValue, option.value]
      } else {
        newValue = newValue.filter((o) => o !== option.value)
      }
      onChangeSafe(newValue)
    } else {
      onChangeSafe(selected ? option.value : emptyValue())
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
            onClick={togglePopover}
            isDisabled={isDisabled}
            isLoading={isLoading}
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
            onClick={togglePopover}
            isDisabled={isDisabled}
            isLoading={isLoading}
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
      const renderOption: EuiSelectableProps["renderOption"] = renderSearchOption
        ? (opt, searchValue) => {
            const oOpt = opt.data?.__original ?? (opt as any).__original
            return oOpt ? renderSearchOption(oOpt, searchValue) : opt.label
          }
        : undefined

      return (
        <EuiSelectable
          options={selectableOptions}
          searchable={searchable}
          singleSelection={!multiple}
          onChange={handleSelectableChange}
          listProps={{ onFocusBadge: false, ...searchListProps }}
          renderOption={renderOption}
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
          options={selectOptionsListOptions}
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
