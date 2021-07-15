import { EuiHeaderBreadcrumbs } from "@elastic/eui"
import { EuiBreadcrumb } from "@elastic/eui/src/components/breadcrumbs/breadcrumbs"
import { useLinkProps } from "@react-mool/core"
import { ReactNode } from "react"
import { createStackCollector } from "../helpers/createStackCollector"

export type BreadcrumbsItemProps = {
  to?: string
  children?: ReactNode
}

const { Consumer, Producer } = createStackCollector<BreadcrumbsItemProps>()

export const BreadcrumbsItem = (props: BreadcrumbsItemProps) => {
  return <Producer data={props} />
}

export const BreadcrumbsContainer = () => {
  const linkProps = useLinkProps()

  return (
    <Consumer>
      {(items) => {
        const breadcrumbs: EuiBreadcrumb[] = items.map((item) => ({
          text: item.children,
          ...(item.to ? linkProps(item.to) : {}),
        }))

        return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />
      }}
    </Consumer>
  )
}
