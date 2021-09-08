import { EuiHorizontalRule, EuiPageHeader, IconType } from "@elastic/eui"
import { useGetResourceLabel, useResource, useResourceDefinition } from "@react-mool/core"
import { ReactNode } from "react"

export type CreateHeaderProps = {
  resource?: string
  title?: ReactNode
  icon?: IconType
  description?: ReactNode
  actions?: ReactNode[]
  showIcon?: boolean
  divider?: boolean
  children?: ReactNode
}

export const CreateHeader = (props: CreateHeaderProps) => {
  const resource = useResource(props.resource)
  const definition = useResourceDefinition(resource)
  const getLabel = useGetResourceLabel()

  const {
    title = getLabel(resource, 1),
    icon = definition.icon ?? "list",
    description,
    actions,
    showIcon = false,
    divider = true,
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
      {divider && <EuiHorizontalRule />}
    </>
  )
}
