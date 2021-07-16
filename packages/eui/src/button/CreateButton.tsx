import { EuiButton, EuiButtonProps } from "@elastic/eui"
import {
  useGetResourceLabel,
  useRedirectLink,
  useResource,
  useTranslate,
} from "@react-mool/core"
import { t } from "../i18n"

export type CreateButtonProps = EuiButtonProps & {
  resource?: string
}

export const CreateButton = (props: CreateButtonProps) => {
  const { resource: resourceProp, children, ...buttonProps } = props

  const resource = useResource(resourceProp)
  const link = useRedirectLink({ resource })
  const getResourceLabel = useGetResourceLabel()
  const translate = useTranslate()

  const label = translate(`resources.${resource}.action.create`, {
    defaultValue: `${translate(t.eui.action.create)} ${getResourceLabel(resource)}`,
  })

  return (
    <EuiButton
      fill={true}
      iconType="plusInCircleFilled"
      {...link("create")}
      {...buttonProps}
    >
      {children ?? label}
    </EuiButton>
  )
}
