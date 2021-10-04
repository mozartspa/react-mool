import { EuiContextMenuItem, keys } from "@elastic/eui"
import React, { useRef } from "react"
import { SelectOption } from "./Select"

enum ShiftDirection {
  BACK = "back",
  FORWARD = "forward",
}

export type SelectOptionListProps<T = any> = {
  options: SelectOption<T>[]
  selectedValues: T[]
  onOptionChange: (option: SelectOption<T>, selected: boolean) => void
  hasDividers?: boolean
}

export const SelectOptionList = React.memo(
  <T extends any>(props: SelectOptionListProps<T>) => {
    const { options, selectedValues, onOptionChange, hasDividers } = props

    const itemNodesRef = useRef<Array<HTMLButtonElement | null>>([])

    const setItemNode = (node: HTMLButtonElement | null, index: number) => {
      itemNodesRef.current[index] = node
    }

    const onItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (event.key) {
        case keys.TAB:
          // no-op
          event.preventDefault()
          event.stopPropagation()
          break

        case keys.ARROW_UP:
          event.preventDefault()
          event.stopPropagation()
          shiftFocus(ShiftDirection.BACK)
          break

        case keys.ARROW_DOWN:
          event.preventDefault()
          event.stopPropagation()
          shiftFocus(ShiftDirection.FORWARD)
          break
      }
    }

    const focusItemAt = (index: number) => {
      const targetElement = itemNodesRef.current[index]
      if (targetElement != null) {
        targetElement.focus()
      }
    }

    const shiftFocus = (direction: ShiftDirection) => {
      const currentIndex = itemNodesRef.current.indexOf(
        document.activeElement as HTMLButtonElement
      )
      let targetElementIndex: number

      if (currentIndex === -1) {
        // somehow the select options has lost focus
        targetElementIndex = 0
      } else {
        if (direction === ShiftDirection.BACK) {
          targetElementIndex =
            currentIndex === 0 ? itemNodesRef.current.length - 1 : currentIndex - 1
        } else {
          targetElementIndex =
            currentIndex === itemNodesRef.current.length - 1 ? 0 : currentIndex + 1
        }
      }

      focusItemAt(targetElementIndex)
    }

    const itemClassName =
      "euiSuperSelect__item" + (hasDividers ? " euiSuperSelect__item--hasDividers" : "")

    const items = options.map((option, index) => {
      const { value, dropdownDisplay, inputDisplay, label, disabled } = option

      const isSelected = selectedValues.indexOf(value) !== -1

      return (
        <EuiContextMenuItem
          key={index}
          className={itemClassName}
          icon={isSelected ? "check" : "empty"}
          disabled={disabled}
          onClick={() => onOptionChange?.(option, !isSelected)}
          onKeyDown={onItemKeyDown}
          buttonRef={(node) => setItemNode(node, index)}
          role="option"
        >
          {dropdownDisplay || inputDisplay || label}
        </EuiContextMenuItem>
      )
    })

    return (
      <div className="euiSuperSelect__listbox" role="listbox" tabIndex={0}>
        {items}
      </div>
    )
  }
)
