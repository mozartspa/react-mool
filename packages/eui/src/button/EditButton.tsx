import {
  EuiButton,
  EuiButtonIcon,
  EuiButtonIconProps,
  EuiButtonProps,
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

  const label = translate(`resources.${resource}.action.edit`, {
    defaultValue: translate(t.eui.action.edit),
  })

  if (asIcon) {
    return (
      <EuiButtonIcon
        iconType="pencil"
        display="base"
        size="m"
        aria-label={label}
        type="submit"
        {...link("edit", { id })}
        {...(buttonProps as Partial<EuiButtonIconProps>)}
      />
    )
  } else {
    return (
      <EuiButton
        fill={true}
        type="submit"
        iconType="pencil"
        {...link("edit", { id })}
        {...(buttonProps as Partial<EuiButtonProps>)}
      >
        {children ?? label}
      </EuiButton>
    )
  }
}
