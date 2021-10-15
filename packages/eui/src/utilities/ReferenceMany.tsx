import { GetMany, RecordID } from "@react-mool/core"
import React, { ReactNode } from "react"
import { RecordLink, RecordLinkTo } from "./RecordLink"

export type ReferenceManyProps<TRecord = any> = {
  ids: RecordID[]
  resource: string
  linkTo?: RecordLinkTo<TRecord>
  itemSeparator?: ReactNode
  renderItems?: (records: TRecord[]) => ReactNode
  loadingView?: ReactNode
  errorView?: ReactNode
}

export const ReferenceMany = <TRecord extends any>(
  props: ReferenceManyProps<TRecord>
) => {
  const {
    ids,
    resource,
    linkTo = false,
    itemSeparator = ", ",
    renderItems,
    loadingView,
    errorView,
  } = props

  if (linkTo && renderItems) {
    throw new Error(
      `<ReferenceMany/> accepts either 'linkTo' or 'renderItems' props, not both.`
    )
  }

  const renderRecords = (records: (TRecord | undefined)[]) => {
    const nonNullRecords = records.filter(Boolean) as TRecord[]

    if (renderItems) {
      return <>{renderItems(nonNullRecords)}</>
    } else {
      return nonNullRecords.map((item, i) => (
        <React.Fragment key={i}>
          <RecordLink record={item} resource={resource} linkTo={linkTo} />
          {i < nonNullRecords.length - 1 && itemSeparator}
        </React.Fragment>
      ))
    }
  }

  return (
    <GetMany<TRecord>
      ids={ids}
      resource={resource}
      loadingView={loadingView}
      errorView={errorView}
    >
      {(records) => {
        return renderRecords(records)
      }}
    </GetMany>
  )
}
