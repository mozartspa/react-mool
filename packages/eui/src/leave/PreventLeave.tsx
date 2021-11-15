import React, { useImperativeHandle } from "react"
import { usePreventLeave, UsePreventLeaveOptions } from "./usePreventLeave"

export type PreventLeaveProps = UsePreventLeaveOptions

export type PreventLeaveElement = ReturnType<typeof usePreventLeave>

export const PreventLeave = React.forwardRef<PreventLeaveElement, PreventLeaveProps>(
  (props, ref) => {
    const { maybeAskConfirm, allowLeaveOnce } = usePreventLeave(props)

    useImperativeHandle(
      ref,
      () => ({
        maybeAskConfirm,
        allowLeaveOnce,
      }),
      [maybeAskConfirm, allowLeaveOnce]
    )

    return null
  }
)
