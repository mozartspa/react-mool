import { EuiGlobalToastList, EuiGlobalToastListProps } from "@elastic/eui"
import { useNotificationContext, useTranslate } from "@react-mool/core"
import { ReactNode, useMemo } from "react"

// Toast is not exported by eui, we should take it by ourself
type Toast = EuiGlobalToastListProps["toasts"][number]

function maybeTranslate(
  value: ReactNode,
  translate: (key: string, options?: any) => string
) {
  if (typeof value === "string") {
    return translate(value) || value
  } else {
    return value
  }
}

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
        title: maybeTranslate(item.title, t),
        text: item.text ? <>{maybeTranslate(item.text, t)}</> : undefined,
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
