import { EuiButton, EuiButtonProps } from "@elastic/eui"
import { RecordID, useRedirectLink, useResource, useTranslate } from "@react-mool/core"
import { t } from "../i18n"

export type EditButtonProps = EuiButtonProps & {
  resource?: string
  id?: RecordID
}

export const EditButton = (props: EditButtonProps) => {
  const { resource: resourceProp, id, children, ...buttonProps } = props

  const resource = useResource(resourceProp)
  const link = useRedirectLink({ resource })
  const translate = useTranslate()

  const label = translate(`resources.${resource}.action.edit`, {
    defaultValue: translate(t.eui.action.edit),
  })

  return (
    <EuiButton fill={true} iconType="pencil" {...link("edit", { id })} {...buttonProps}>
      {children ?? label}
    </EuiButton>
  )
}
