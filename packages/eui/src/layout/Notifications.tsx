import { EuiGlobalToastList, EuiGlobalToastListProps } from "@elastic/eui"
import { useNotificationContext, useTranslate } from "@react-mool/core"
import { useMemo } from "react"

// Toast is not exported by eui, we should take it by ourself
type Toast = EuiGlobalToastListProps["toasts"][number]

export type NotificationsProps = {
  toastLifeTimeMs?: number
}

export function Notifications(props: NotificationsProps) {
  const { toastLifeTimeMs = 3000 } = props

  const { notifications, remove } = useNotificationContext()
  const t = useTranslate()

  const toasts = useMemo(() => {
    return notifications.map(
      (item): Toast => ({
        id: item.id,
        title: t(item.title),
        text: item.text ? <>{t(item.text)}</> : undefined,
        color: item.type,
      })
    )
  }, [notifications])

  return (
    <EuiGlobalToastList
      toasts={toasts}
      dismissToast={(toast) => {
        remove(toast.id)
      }}
      toastLifeTimeMs={toastLifeTimeMs}
    />
  )
}
