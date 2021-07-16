import { EuiHorizontalRule, EuiPageHeader, IconType } from "@elastic/eui"
import { useGetResourceLabel, useResource, useResourceDefinition } from "@react-mool/core"
import { ReactNode } from "react"

export type ListHeaderProps = {
  resource?: string
  title?: ReactNode
  icon?: IconType
  description?: ReactNode
  actions?: ReactNode[]
  showHorizontalRule?: boolean
  children?: ReactNode
}

export const ListHeader = (props: ListHeaderProps) => {
  const resource = useResource(props.resource)
  const definition = useResourceDefinition(resource)
  const getLabel = useGetResourceLabel()

  const {
    title = getLabel(resource, 2),
    icon = definition.icon ?? "list",
    description,
    actions,
    showHorizontalRule = true,
    children,
  } = props

  return (
    <>
      <EuiPageHeader
        pageTitle={title}
        iconType={icon}
        description={description}
        rightSideItems={actions}
        rightSideGroupProps={{ gutterSize: "s" }}
      >
        {children}
      </EuiPageHeader>
      {showHorizontalRule && <EuiHorizontalRule />}
    </>
  )
}
