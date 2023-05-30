import {
  useGetResourceLabel,
  useRedirectUrl,
  useResource,
  useResourceDefinition,
} from "@react-mool/core"
import { BreadcrumbsItem } from "../layout"

export const ListBreadcrumbs = () => {
  const resource = useResource()
  const definition = useResourceDefinition(resource)
  const redirectUrl = useRedirectUrl({ resource })
  const getResourceLabel = useGetResourceLabel()

  const hasList = !!definition.list

  return (
    <BreadcrumbsItem to={hasList ? redirectUrl("list") : undefined}>
      {getResourceLabel(resource, 2)}
    </BreadcrumbsItem>
  )
}
