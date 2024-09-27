import { EuiBreadcrumbsProps, EuiHeaderBreadcrumbs, EuiLinkColor } from "@elastic/eui"
import type { EuiBreadcrumbProps } from "@elastic/eui/src/components/breadcrumbs/types"
import { useLinkProps } from "@react-mool/core"
import { MouseEventHandler, ReactNode } from "react"
import { createStackCollector } from "../helpers/createStackCollector"

export type BreadcrumbsItemProps = {
  to?: string
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLAnchorElement>
  truncate?: boolean
  color?: EuiLinkColor
  disableClientSideRouting?: boolean
}

const { Consumer, Producer } = createStackCollector<BreadcrumbsItemProps>()

export const BreadcrumbsItem = (props: BreadcrumbsItemProps) => {
  return <Producer data={props} />
}

export type BreadcrumbsContainerProps = Omit<EuiBreadcrumbsProps, "breadcrumbs">

export const BreadcrumbsContainer = (props: BreadcrumbsContainerProps) => {
  const linkProps = useLinkProps()

  return (
    <Consumer>
      {(items) => {
        const breadcrumbs: EuiBreadcrumbProps[] = items
          .filter((item) => item.children != null)
          .map((item) => {
            const { to, children, disableClientSideRouting, ...rest } = item
            return {
              text: item.children,
              ...(item.to
                ? disableClientSideRouting
                  ? { href: item.to }
                  : linkProps(item.to)
                : {}),
              ...rest,
            }
          })

        return <EuiHeaderBreadcrumbs {...props} breadcrumbs={breadcrumbs} />
      }}
    </Consumer>
  )
}
