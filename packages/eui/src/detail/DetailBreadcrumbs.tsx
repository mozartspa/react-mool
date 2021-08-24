import { useGetRecordName, useRecord, useResource } from "@react-mool/core"
import { BreadcrumbsItem } from "../layout"
import { ListBreadcrumbs } from "../list"

export const DetailBreadcrumbs = () => {
  const resource = useResource()
  const record = useRecord()
  const getRecordName = useGetRecordName(resource)

  const hasRecord = !!record

  if (!hasRecord) {
    return null
  }

  return (
    <>
      <ListBreadcrumbs />
      <BreadcrumbsItem>{getRecordName(record)}</BreadcrumbsItem>
    </>
  )
}
