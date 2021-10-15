import { EuiBadge, EuiComboBoxOptionOption, EuiComboBoxProps } from "@elastic/eui"
import React from "react"
import { Value, ValueProps } from "./Value"

function defaultRenderOption(option: EuiComboBoxOptionOption) {
  return <EuiBadge color={option.color}>{option.label}</EuiBadge>
}

type ComboBoxProps = Pick<EuiComboBoxProps<any>, "options" | "renderOption">

export type ComboBoxValueProps = ValueProps & ComboBoxProps

export const ComboBoxValue = (props: ComboBoxValueProps) => {
  const { options = [], renderOption } = props

  const renderContent = (value: any) => {
    const val = Array.isArray(value) ? value : []
    const selectedOptions = options.filter((o) => val.includes(o.value ?? o.label))

    return selectedOptions.map((opt, i) => (
      <React.Fragment key={i}>
        {renderOption ? renderOption(opt, "", "") : defaultRenderOption(opt)}
      </React.Fragment>
    ))
  }

  return (
    <Value {...props}>
      {({ value }) => {
        return renderContent(value)
      }}
    </Value>
  )
}
