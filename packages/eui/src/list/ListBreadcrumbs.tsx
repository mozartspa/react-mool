import {
  useGetResourceLabel,
  useRedirectLink,
  useResource,
  useResourceDefinition,
} from "@react-mool/core"
import { BreadcrumbsItem } from "../layout"

export const ListBreadcrumbs = () => {
  const resource = useResource()
  const definition = useResourceDefinition(resource)
  const redirectLink = useRedirectLink({ resource })
  const getResourceLabel = useGetResourceLabel()

  const hasList = !!definition.list

  return (
    <BreadcrumbsItem to={hasList ? redirectLink("list").href : undefined}>
      {getResourceLabel(resource, 2)}
    </BreadcrumbsItem>
  )
}
