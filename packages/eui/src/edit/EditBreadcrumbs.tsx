import {
  useGetRecordName,
  useRecord,
  useRedirectLink,
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
  const redirectLink = useRedirectLink({ resource })
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
        to={
          hasDetail
            ? redirectLink("detail").href
            : hasEdit
            ? redirectLink("edit").href
            : undefined
        }
      >
        {getRecordName(record)}
      </BreadcrumbsItem>
      {hasDetail && <BreadcrumbsItem>{translate(t.eui.action.edit)}</BreadcrumbsItem>}
    </>
  )
}
