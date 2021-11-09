import { FieldScopeContext, useFormContext } from "@mozartspa/mobx-form"
import { useObserveMobxValue } from "@react-mool/core"
import React from "react"

export function useInputValue<TValue = any>(name: string): TValue {
  const form = useFormContext()
  const fieldPrefix = React.useContext(FieldScopeContext)

  const fieldName = fieldPrefix + name

  // To avoid that the caller of `useInputValue` have to wrap
  // the component with mobx `observer` (we're accessing a mobx
  // observable value, thus we have to do it), we listen to its
  // changes with `useObserveMobxValue`.
  const inputValue = useObserveMobxValue(
    () => form?.getFieldValue(fieldName),
    [form, fieldName]
  )

  return inputValue
}
