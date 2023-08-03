import {
  EuiHorizontalRule,
  EuiPageHeader,
  EuiPageHeaderProps,
  IconType,
} from "@elastic/eui"
import {
  useGetRecordName,
  useRecord,
  useResource,
  useResourceDefinition,
} from "@react-mool/core"
import { ReactNode } from "react"

export type EditHeaderProps = {
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

export const EditHeader = (props: EditHeaderProps) => {
  const resource = useResource(props.resource)
  const definition = useResourceDefinition(resource)
  const getName = useGetRecordName(resource)
  const record = useRecord()

  const {
    title = record ? getName(record) : <span>&nbsp;</span>,
    titleProps,
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
