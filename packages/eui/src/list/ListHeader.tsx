import {
  EuiHorizontalRule,
  EuiPageHeader,
  EuiPageHeaderProps,
  IconType,
} from "@elastic/eui"
import { useGetResourceLabel, useResource, useResourceDefinition } from "@react-mool/core"
import { ReactNode } from "react"

export type ListHeaderProps = {
  resource?: string
  title?: ReactNode
  titleProps?: EuiPageHeaderProps["pageTitleProps"]
  icon?: IconType
  description?: ReactNode
  actions?: ReactNode[]
  showIcon?: boolean
  divider?: boolean
  children?: ReactNode
}

export const ListHeader = (props: ListHeaderProps) => {
  const resource = useResource(props.resource)
  const definition = useResourceDefinition(resource)
  const getLabel = useGetResourceLabel()

  const {
    title = getLabel(resource, 2),
    titleProps,
    icon = definition.icon ?? "list",
    description,
    actions,
    showIcon = true,
    divider = true,
    children,
  } = props

  return (
    <>
      <EuiPageHeader
        pageTitle={title}
        pageTitleProps={titleProps}
        iconType={showIcon ? icon : undefined}
        description={description}
        rightSideItems={actions}
        rightSideGroupProps={{ gutterSize: "s" }}
      >
        {children}
      </EuiPageHeader>
      {divider && <EuiHorizontalRule />}
    </>
  )
}
