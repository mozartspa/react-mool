import { EuiHorizontalRule, EuiPageHeader, IconType } from "@elastic/eui"
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
  icon?: IconType
  description?: ReactNode
  actions?: ReactNode[]
  showIcon?: boolean
  showHorizontalRule?: boolean
  children?: ReactNode
}

export const EditHeader = (props: EditHeaderProps) => {
  const resource = useResource(props.resource)
  const definition = useResourceDefinition(resource)
  const getName = useGetRecordName(resource)
  const record = useRecord()

  const {
    title = record ? getName(record) : "",
    icon = definition.icon ?? "list",
    description,
    actions,
    showIcon = false,
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
