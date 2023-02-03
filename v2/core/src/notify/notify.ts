import React, { ReactNode, useCallback, useMemo, useState } from "react"
import { useIdGenerator } from "../helpers/useIdGenerator"
import { useImmediateRef } from "../helpers/useImmediateRef"

export type NotificationType = "success" | "danger" | "warning" | "primary"

export type NewNotification = {
  id?: string
  title: ReactNode
  type: NotificationType
  text?: ReactNode
}

export type Notification = NewNotification & {
  id: string
}

export type UseNotificationResult = {
  notifications: Notification[]
  add: (newNotification: NewNotification) => string
  remove: (id: string) => void
  removeByFilter: (filter: (item: Notification, index: number) => boolean) => void
  clear: () => void
}

export function useNotification(): UseNotificationResult {
  const [nextId] = useIdGenerator("n")

  const [state, setState] = useState(() => ({
    notifications: [] as Notification[],
  }))

  const result = useMemo(() => {
    return {
      ...state,

      add: (newNotification: NewNotification) => {
        const item = { ...newNotification, id: newNotification.id || nextId() }
        setState((state) => ({
          ...state,
          notifications: [...state.notifications.filter((o) => o.id !== item.id), item],
        }))
        return item.id
      },

      remove: (id: string) => {
        setState((state) => ({
          ...state,
          notifications: state.notifications.filter((o) => o.id !== id),
        }))
      },

      removeByFilter: (filter: (item: Notification, index: number) => boolean) => {
        setState((state) => ({
          ...state,
          notifications: state.notifications.filter(filter),
        }))
      },

      clear: () => {
        setState((state) => ({
          ...state,
          notifications: [],
        }))
      },
    }
  }, [state])

  return result
}

export const NotificationContext = React.createContext<UseNotificationResult | undefined>(
  undefined
)

export function useNotificationContext() {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error("NotificationContext not found.")
  }
  return context
}

export function useNotify() {
  const contextRef = useImmediateRef(useNotificationContext())

  const notify = useCallback(
    (
      title: ReactNode,
      options: {
        id?: string
        type?: NotificationType
        text?: ReactNode
      } = {}
    ) => {
      const { id, type = "primary", text } = options

      contextRef.current.add({ id, title, type, text })
    },
    []
  )

  const success = useCallback(
    (
      title: ReactNode,
      options: {
        id?: string
        text?: ReactNode
      } = {}
    ) => {
      const { id, text } = options
      contextRef.current.add({ id, title, text, type: "success" })
    },
    [notify]
  )

  const warning = useCallback(
    (
      title: ReactNode,
      options: {
        id?: string
        text?: ReactNode
      } = {}
    ) => {
      const { id, text } = options
      contextRef.current.add({ id, title, text, type: "warning" })
    },
    [notify]
  )

  const danger = useCallback(
    (
      title: ReactNode,
      options: {
        id?: string
        text?: ReactNode
      } = {}
    ) => {
      const { id, text } = options
      contextRef.current.add({ id, title, text, type: "danger" })
    },
    [notify]
  )

  const primary = useCallback(
    (
      title: ReactNode,
      options: {
        id?: string
        text?: ReactNode
      } = {}
    ) => {
      const { id, text } = options
      contextRef.current.add({ id, title, text, type: "primary" })
    },
    [notify]
  )

  const result = useMemo(() => {
    return {
      notify,
      success,
      warning,
      danger,
      primary,
    }
  }, [notify, success, warning, danger, primary])

  return result
}
