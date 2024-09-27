import { EuiGlobalToastList } from "@elastic/eui"
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list"
import { useNotificationContext, useTranslate } from "@react-mool/core"
import { useMemo } from "react"
import { t } from "../i18n"

export type NotificationsProps = {
  toastLifeTimeMs?: number
}

export function Notifications(props: NotificationsProps) {
  const { toastLifeTimeMs = 3000 } = props

  const { notifications, remove } = useNotificationContext()
  const translate = useTranslate()

  const toasts = useMemo(() => {
    return notifications.map(
      (item): Toast => ({
        id: item.id,
        title: translate(item.title),
        text: item.text ? <>{translate(item.text)}</> : undefined,
        color: item.type,
      })
    )
  }, [notifications])

  return (
    <EuiGlobalToastList
      aria-label={translate(t.eui.notifications.ariaLabel)}
      toasts={toasts}
      dismissToast={(toast) => {
        remove(toast.id)
      }}
      toastLifeTimeMs={toastLifeTimeMs}
    />
  )
}
