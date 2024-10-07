import {
  EuiButton,
  EuiButtonIcon,
  EuiButtonIconProps,
  EuiButtonProps,
  useEuiTheme,
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

  const { euiTheme } = useEuiTheme()

  const label = translate(`resources.${resource}.action.create`, {
    defaultValue: `${translate(t.eui.action.create)} ${getResourceLabel(resource)}`,
  })

  // If the button is disabled, we want to show it with a different background color overriding the EUI theme
  const style = {
    backgroundColor: buttonProps.isDisabled ? euiTheme.colors.disabled : "inherit",
    ...buttonProps.style,
  }

  if (asIcon) {
    return (
      <EuiButtonIcon
        iconType="plusInCircleFilled"
        display="base"
        size="m"
        aria-label={label}
        {...link("create")}
        {...(buttonProps as Partial<EuiButtonIconProps>)}
        style={style}
      />
    )
  } else {
    return (
      <EuiButton
        fill={true}
        iconType="plusInCircleFilled"
        {...link("create")}
        {...(buttonProps as Partial<EuiButtonProps>)}
        style={style}
      >
        {children ?? label}
      </EuiButton>
    )
  }
}
