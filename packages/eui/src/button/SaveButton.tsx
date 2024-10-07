import {
  EuiButton,
  EuiButtonIcon,
  EuiButtonIconProps,
  EuiButtonProps,
  EuiLoadingSpinner,
  useEuiTheme,
} from "@elastic/eui"
import { useFormContext } from "@mozartspa/mobx-form"
import { useResource, useTranslate } from "@react-mool/core"
import { observer } from "mobx-react-lite"
import { t } from "../i18n"
import { BaseButtonProps } from "./BaseButtonProps"

export type SaveButtonProps = BaseButtonProps & {
  disableIfPristine?: boolean
}

export const SaveButton = observer((props: SaveButtonProps) => {
  const { disableIfPristine = true, children, asIcon, ...buttonProps } = props

  const { euiTheme } = useEuiTheme()
  const resource = useResource()
  const translate = useTranslate()

  const label = translate(`resources.${resource}.action.save`, {
    defaultValue: `${translate(t.eui.action.save)}`,
  })

  const form = useFormContext()

  const commonProps = {
    iconType: "save",
    onClick: form.submit,
    disabled: disableIfPristine ? !form.isDirty : undefined,
    isLoading: form.isSubmitting,
  }

  // If the button is disabled, we want to show it with a different background color overriding the EUI theme
  const style = {
    backgroundColor: commonProps.disabled ? euiTheme.colors.disabled : "inherit",
    ...buttonProps.style,
  }

  if (asIcon) {
    return (
      <EuiButtonIcon
        display="base"
        size="m"
        aria-label={label}
        onClick={commonProps.onClick}
        isDisabled={commonProps.isLoading || commonProps.disabled}
        {...(buttonProps as Partial<EuiButtonIconProps>)}
        iconType={
          commonProps.isLoading
            ? EuiLoadingSpinner
            : buttonProps.iconType || commonProps.iconType
        }
        style={style}
      />
    )
  } else {
    return (
      <EuiButton
        fill={true}
        {...commonProps}
        {...(buttonProps as Partial<EuiButtonProps>)}
        style={style}
      >
        {children ?? label}
      </EuiButton>
    )
  }
})
