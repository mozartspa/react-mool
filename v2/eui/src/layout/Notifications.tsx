import { EuiGlobalToastList, EuiGlobalToastListProps } from "@elastic/eui"
import { useNotificationContext } from "@react-mool/core-v2"
import { useMemo } from "react"

// Toast is not exported by eui, we should take it by ourself
type Toast = Exclude<EuiGlobalToastListProps["toasts"], undefined>[number]

export type NotificationsProps = {
  toastLifeTimeMs?: number
}

export function Notifications(props: NotificationsProps) {
  const { toastLifeTimeMs = 3000 } = props

  const { notifications, remove } = useNotificationContext()

  const toasts = useMemo(() => {
    return notifications.map(
      (item): Toast => ({
        id: item.id,
        title: item.title,
        text: item.text ? <>{item.text}</> : undefined,
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
