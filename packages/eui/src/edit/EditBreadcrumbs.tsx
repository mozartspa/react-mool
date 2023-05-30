import {
  useGetRecordName,
  useRecord,
  useRedirectUrl,
  useResource,
  useResourceDefinition,
  useTranslate,
} from "@react-mool/core"
import { t } from "../i18n"
import { BreadcrumbsItem } from "../layout"
import { ListBreadcrumbs } from "../list"

export const EditBreadcrumbs = () => {
  const resource = useResource()
  const definition = useResourceDefinition(resource)
  const record = useRecord()
  const redirectUrl = useRedirectUrl({ resource })
  const getRecordName = useGetRecordName(resource)
  const translate = useTranslate()

  const hasRecord = !!record
  const hasEdit = !!definition.edit
  const hasDetail = !!definition.detail

  if (!hasRecord) {
    return null
  }

  return (
    <>
      <ListBreadcrumbs />
      <BreadcrumbsItem
        to={hasDetail ? redirectUrl("detail") : hasEdit ? redirectUrl("edit") : undefined}
      >
        {getRecordName(record)}
      </BreadcrumbsItem>
      {hasDetail && <BreadcrumbsItem>{translate(t.eui.action.edit)}</BreadcrumbsItem>}
    </>
  )
}
