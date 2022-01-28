import { GetMany, useDataProvider, useGetRecordName } from "@react-mool/core"
import { ReactNode, useCallback } from "react"
import { SelectResourceProps } from "../select"
import { Value, ValueProps } from "./Value"

export type SelectResourceValueProps<TRecord = any> = ValueProps &
  Pick<SelectResourceProps<TRecord>, "resource" | "toOptions" | "multiple"> & {
    loadingView?: ReactNode
  }

export const SelectResourceValue = <TRecord extends any>(
  props: SelectResourceValueProps<TRecord>
) => {
  const { resource, toOptions, multiple, loadingView } = props

  const getName = useGetRecordName(resource)
  const dataProvider = useDataProvider()

  const renderSingle = (record: TRecord | undefined) => {
    if (!record) {
      return null
    }

    if (toOptions) {
      const opt = toOptions([record])[0]
      return opt.inputDisplay || opt.label
    } else {
      return getName(record)
    }
  }

  const renderMultiple = (records: (TRecord | undefined)[]) => {
    const nonNullRecords = records.filter(Boolean) as TRecord[]

    if (toOptions) {
      const opts = toOptions(nonNullRecords)
      return opts.map((o) => o.label).join(", ")
    } else {
      return nonNullRecords.map((o) => getName(o)).join(", ")
    }
  }

  const renderContent = (value: any) => {
    if (value == null) {
      return null
    }

    const ids = Array.isArray(value) ? value : [value]

    return (
      <GetMany<TRecord> ids={ids} resource={resource}>
        {(records, { isLoading }) => {
          if (isLoading) {
            return loadingView
          }

          return multiple ? renderMultiple(records) : renderSingle(records[0])
        }}
      </GetMany>
    )
  }

  // Format function in order to support 2 different formats of value:
  // - multiple false: id of the related record or the related record directly.
  // - multiple true: array of ids of the related records, or array of records.
  const format = useCallback(
    (value: any) => {
      const maybeConvertToId = (value: any) => {
        return value != null && typeof value === "object"
          ? dataProvider.id(resource, value)
          : value
      }

      if (multiple) {
        if (value == null) {
          return []
        }
        const list = Array.isArray(value) ? value : [value]
        const ids = list.map((item) => maybeConvertToId(item)).filter(Boolean)
        return ids
      } else {
        return maybeConvertToId(value)
      }
    },
    [dataProvider, resource, multiple]
  )

  return (
    <Value {...props} format={props.format ?? format}>
      {({ value }) => {
        return renderContent(value)
      }}
    </Value>
  )
}
