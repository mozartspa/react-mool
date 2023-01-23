import React, { ReactNode, useImperativeHandle } from "react"
import { PreventLeaveContext } from "./PreventLeaveContext"
import { usePreventLeaveForm, UsePreventLeaveFormOptions } from "./usePreventLeaveForm"

export type PreventLeaveFormProps = UsePreventLeaveFormOptions & { children?: ReactNode }

export type PreventLeaveFormElement = ReturnType<typeof usePreventLeaveForm>

export const PreventLeaveForm = React.forwardRef<
  PreventLeaveFormElement,
  PreventLeaveFormProps
>((props, ref) => {
  const leave = usePreventLeaveForm(props)

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
})
