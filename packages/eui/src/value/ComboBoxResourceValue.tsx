import { EuiBadge, EuiComboBoxOptionOption } from "@elastic/eui"
import { GetMany, useGetRecordName } from "@react-mool/core"
import React, { ReactNode } from "react"
import { ComboBoxResourceInputProps } from "../input"
import { Value, ValueProps } from "./Value"

function defaultRenderOption(option: EuiComboBoxOptionOption) {
  return <EuiBadge color={option.color}>{option.label}</EuiBadge>
}

export type ComboBoxResourceValueProps<TRecord = any> = ValueProps &
  Pick<ComboBoxResourceInputProps<TRecord>, "resource" | "toOptions" | "renderOption"> & {
    loadingView?: ReactNode
    errorView?: ReactNode
  }

export const ComboBoxResourceValue = <TRecord extends any>(
  props: ComboBoxResourceValueProps<TRecord>
) => {
  const { resource, toOptions, renderOption, loadingView, errorView } = props

  const getName = useGetRecordName(resource)

  const renderRecords = (records: (TRecord | undefined)[]) => {
    const nonNullRecords = records.filter(Boolean) as TRecord[]
    const options = toOptions
      ? toOptions(nonNullRecords)
      : nonNullRecords.map((record) => ({ label: getName(record) }))

    return options.map((opt, i) => (
      <React.Fragment key={i}>
        {renderOption ? renderOption(opt, "", "") : defaultRenderOption(opt)}
      </React.Fragment>
    ))
  }

  const renderContent = (value: any) => {
    if (value == null) {
      return null
    }

    const ids = Array.isArray(value) ? value : [value]

    return (
      <GetMany<TRecord>
        ids={ids}
        resource={resource}
        loadingView={loadingView}
        errorView={errorView}
      >
        {(records) => {
          return renderRecords(records ?? [])
        }}
      </GetMany>
    )
  }

  return (
    <Value {...props}>
      {({ value }) => {
        return renderContent(value)
      }}
    </Value>
  )
}
