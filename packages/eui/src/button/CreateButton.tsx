import {
  EuiButton,
  EuiButtonIcon,
  EuiButtonIconProps,
  EuiButtonProps,
} from "@elastic/eui"
import {
  useGetResourceLabel,
  useRedirectLink,
  useResource,
  useTranslate,
} from "@react-mool/core"
import { t } from "../i18n"
import { BaseButtonProps } from "./BaseButtonProps"

export type CreateButtonProps = BaseButtonProps & {
  resource?: string
}

export const CreateButton = (props: CreateButtonProps) => {
  const { resource: resourceProp, children, asIcon, ...buttonProps } = props

  const resource = useResource(resourceProp)
  const link = useRedirectLink({ resource })
  const getResourceLabel = useGetResourceLabel()
  const translate = useTranslate()

  const label = translate(`resources.${resource}.action.create`, {
    defaultValue: `${translate(t.eui.action.create)} ${getResourceLabel(resource)}`,
  })

  if (asIcon) {
    return (
      <EuiButtonIcon
        iconType="plusInCircleFilled"
        display="base"
        size="m"
        aria-label={label}
        type="submit"
        {...link("create")}
        {...(buttonProps as Partial<EuiButtonIconProps>)}
      />
    )
  } else {
    return (
      <EuiButton
        fill={true}
        iconType="plusInCircleFilled"
        type="submit"
        {...link("create")}
        {...(buttonProps as Partial<EuiButtonProps>)}
      >
        {children ?? label}
      </EuiButton>
    )
  }
}
