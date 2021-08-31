import { EuiHorizontalRule, EuiPageHeader, IconType } from "@elastic/eui"
import { useGetResourceLabel, useResource, useResourceDefinition } from "@react-mool/core"
import { ReactNode } from "react"

export type ListHeaderProps = {
  resource?: string
  title?: ReactNode
  icon?: IconType
  description?: ReactNode
  actions?: ReactNode[]
  showIcon?: boolean
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
    showIcon = true,
    showHorizontalRule = true,
    children,
  } = props

  return (
    <>
      <EuiPageHeader
        pageTitle={title}
        iconType={showIcon ? icon : undefined}
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
