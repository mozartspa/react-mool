import { useCallback } from "react"
import { t } from "../i18n"
import { useConfirmation } from "./useConfirmation"

export function useConfirmLeave() {
  const confirm = useConfirmation()

  const confirmLeave = useCallback(() => {
    return confirm(t.eui.confirm_leave.title, {
      content: t.eui.confirm_leave.message,
      confirmLabel: t.eui.confirm_leave.leave,
      cancelLabel: t.eui.confirm_leave.stay,
      buttonColor: "danger",
    })
  }, [confirm])

  return confirmLeave
}
