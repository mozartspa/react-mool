import { ReactNode, useCallback } from "react"
import { t } from "../i18n"
import { ConfirmationOptions, useConfirmation } from "./useConfirmation"

export function useConfirmLeave(defaults?: ConfirmationOptions) {
  const confirm = useConfirmation(defaults)

  const confirmLeave = useCallback(
    (message?: ReactNode, options?: ConfirmationOptions) => {
      return confirm(message ?? t.eui.confirm_leave.title, {
        content: t.eui.confirm_leave.message,
        confirmLabel: t.eui.confirm_leave.leave,
        cancelLabel: t.eui.confirm_leave.stay,
        buttonColor: "danger",
        ...options,
      })
    },
    [confirm]
  )

  return confirmLeave
}
