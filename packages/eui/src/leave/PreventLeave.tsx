import React, { ReactNode, useImperativeHandle } from "react"
import { PreventLeaveContext } from "./PreventLeaveContext"
import { usePreventLeave, UsePreventLeaveOptions } from "./usePreventLeave"

export type PreventLeaveProps = UsePreventLeaveOptions & { children?: ReactNode }

export type PreventLeaveElement = ReturnType<typeof usePreventLeave>

export const PreventLeave = React.forwardRef<PreventLeaveElement, PreventLeaveProps>(
  (props, ref) => {
    const leave = usePreventLeave(props)

    const { maybeAskConfirm, allowLeaveOnce } = leave

    useImperativeHandle(
      ref,
      () => ({
        maybeAskConfirm,
        allowLeaveOnce,
      }),
      [maybeAskConfirm, allowLeaveOnce]
    )

    return (
      <PreventLeaveContext.Provider value={leave}>
        {props.children}
      </PreventLeaveContext.Provider>
    )
  }
)
