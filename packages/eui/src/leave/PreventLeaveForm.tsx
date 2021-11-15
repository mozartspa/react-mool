import React, { useImperativeHandle } from "react"
import { usePreventLeaveForm, UsePreventLeaveFormOptions } from "./usePreventLeaveForm"

export type PreventLeaveFormProps = UsePreventLeaveFormOptions

export type PreventLeaveFormElement = ReturnType<typeof usePreventLeaveForm>

export const PreventLeaveForm = React.forwardRef<
  PreventLeaveFormElement,
  PreventLeaveFormProps
>((props, ref) => {
  const { maybeAskConfirm, allowLeaveOnce } = usePreventLeaveForm(props)

  useImperativeHandle(
    ref,
    () => ({
      maybeAskConfirm,
      allowLeaveOnce,
    }),
    [maybeAskConfirm, allowLeaveOnce]
  )

  return null
})
