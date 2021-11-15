import { Form, FormContext } from "@mozartspa/mobx-form"
import React, { ReactNode } from "react"
import { ConfirmationOptions } from "../confirm"
import { usePreventLeave } from "./usePreventLeave"

export type UsePreventLeaveFormOptions = {
  form?: Form
  confirmMessage?: ReactNode
  confirmOptions?: ConfirmationOptions
}

export function usePreventLeaveForm(options: UsePreventLeaveFormOptions = {}) {
  const { confirmMessage, confirmOptions } = options

  const formContext = React.useContext(FormContext)
  const form = options.form ?? formContext

  const preventLeave = usePreventLeave({
    when: () => form?.isDirty ?? false,
    confirmMessage,
    confirmOptions,
  })

  return preventLeave
}
