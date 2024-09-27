import { GetMany, RecordID } from "@react-mool/core"
import { ReactNode } from "react"
import { RecordLink, RecordLinkTo } from "./RecordLink"

export type ReferenceProps<TRecord = any> = {
  id: RecordID | undefined
  resource: string
  linkTo?: RecordLinkTo<TRecord>
  renderItem?: (record: TRecord) => ReactNode
  loadingView?: ReactNode
  errorView?: ReactNode
  lineClamp?: number | boolean
}

export const Reference = <TRecord extends any>(props: ReferenceProps<TRecord>) => {
  const {
    id,
    resource,
    linkTo = false,
    renderItem,
    loadingView,
    errorView,
    lineClamp,
  } = props

  if (linkTo && renderItem) {
    throw new Error(
      `<Reference/> accepts either 'linkTo' or 'renderItem' props, not both.`
    )
  }

  if (id == null) {
    return null
  }

  const renderRecord = (record: TRecord | undefined) => {
    if (!record) {
      return null
    } else if (renderItem) {
      return <>{renderItem(record)}</>
    } else {
      return (
        <RecordLink
          lineClamp={lineClamp}
          record={record}
          resource={resource}
          linkTo={linkTo}
        />
      )
    }
  }

  // `id` prop should always be a scalar, but we want to be tolerant here
  const ids = Array.isArray(id) ? id : [id]

  return (
    <GetMany<TRecord>
      ids={ids}
      resource={resource}
      loadingView={loadingView}
      errorView={errorView}
    >
      {(records) => {
        return renderRecord(records[0])
      }}
    </GetMany>
  )
}
