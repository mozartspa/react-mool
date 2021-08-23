import { useTranslate } from "@react-mool/core"
import { t } from "../i18n"
import { BreadcrumbsItem } from "../layout"
import { ListBreadcrumbs } from "../list"

export const CreateBreadcrumbs = () => {
  const translate = useTranslate()

  return (
    <>
      <ListBreadcrumbs />
      <BreadcrumbsItem>{translate(t.eui.action.create)}</BreadcrumbsItem>
    </>
  )
}
