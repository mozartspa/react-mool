import { EuiButton, EuiButtonProps } from "@elastic/eui"
import { useFormContext } from "@mozartspa/mobx-form"
import { useResource, useTranslate } from "@react-mool/core"
import { observer } from "mobx-react-lite"
import { t } from "../i18n"

export type UpdateButtonProps = EuiButtonProps & {
  disableIfPristine?: boolean
}

export const UpdateButton = observer((props: UpdateButtonProps) => {
  const { disableIfPristine = true, children, ...buttonProps } = props

  const resource = useResource()
  const translate = useTranslate()

  const label = translate(`resources.${resource}.action.save`, {
    defaultValue: `${translate(t.eui.action.save)}`,
  })

  const form = useFormContext()

  return (
    <EuiButton
      fill={true}
      iconType="save"
      onClick={form.submit}
      isLoading={form.isSubmitting}
      disabled={disableIfPristine ? !form.isDirty : undefined}
      {...buttonProps}
    >
      {children ?? label}
    </EuiButton>
  )
})
