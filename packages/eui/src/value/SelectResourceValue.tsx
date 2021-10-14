import { GetMany, useGetRecordName } from "@react-mool/core"
import { ReactNode } from "react"
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

  return (
    <Value {...props}>
      {({ value }) => {
        return renderContent(value)
      }}
    </Value>
  )
}

/*
useGetOne con undefined? NO

useGetMany con []
<Reference id={}>
 {(record, { isLoading, isRefetching }) => (
   record ? <span>{record.pinco}</span> : null
 )}
</Reference>
<ReferenceMany ids={} render=() />

<ReferenceValue name="pinco">
{(records) => }
</ReferenceValue>

<ReferenceManyValue name="pinco" resource=>
{(records) => records.map() }
</ReferenceManyValue>
*/
