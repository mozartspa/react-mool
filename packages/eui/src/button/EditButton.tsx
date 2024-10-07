import {
  EuiButton,
  EuiButtonIcon,
  EuiButtonIconProps,
  EuiButtonProps,
  useEuiTheme,
} from "@elastic/eui"
import { RecordID, useRedirectLink, useResource, useTranslate } from "@react-mool/core"
import { t } from "../i18n"
import { BaseButtonProps } from "./BaseButtonProps"

export type EditButtonProps = BaseButtonProps & {
  resource?: string
  id?: RecordID
}

export const EditButton = (props: EditButtonProps) => {
  const { resource: resourceProp, id, children, asIcon, ...buttonProps } = props

  const resource = useResource(resourceProp)
  const link = useRedirectLink({ resource })
  const translate = useTranslate()

  const { euiTheme } = useEuiTheme()

  const label = translate(`resources.${resource}.action.edit`, {
    defaultValue: translate(t.eui.action.edit),
  })

  // If the button is disabled, we want to show it with a different background color overriding the EUI theme
  const style = {
    backgroundColor: buttonProps.isDisabled ? euiTheme.colors.disabled : "inherit",
    ...buttonProps.style,
  }

  if (asIcon) {
    return (
      <EuiButtonIcon
        iconType="pencil"
        display="base"
        size="m"
        aria-label={label}
        {...link("edit", { id })}
        {...(buttonProps as Partial<EuiButtonIconProps>)}
        style={style}
      />
    )
  } else {
    return (
      <EuiButton
        fill={true}
        iconType="pencil"
        {...link("edit", { id })}
        {...(buttonProps as Partial<EuiButtonProps>)}
        style={style}
      >
        {children ?? label}
      </EuiButton>
    )
  }
}
