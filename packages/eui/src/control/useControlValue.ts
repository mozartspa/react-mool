import { FormContext } from "@mozartspa/mobx-form"
import { useCrudMode, useObserveMobxValue, useRecordValue } from "@react-mool/core"
import React from "react"

export function useControlValue<TValue = any>(name: string): TValue {
  const crudMode = useCrudMode()
  const form = React.useContext(FormContext)
  const recordValue = useRecordValue(name)

  // To avoid that the caller of `useControlValue` have to wrap
  // the component with mobx `observer` (we're accessing a mobx
  // observable value, thus we have to do it), we listen to its
  // changes with `useObserveMobxValue`.
  const inputValue = useObserveMobxValue(() => form?.getFieldValue(name), [form, name])

  if (crudMode === "create" || crudMode === "edit") {
    if (!form) {
      throw new Error(`Form context not available`)
    }

    return inputValue
  } else {
    return recordValue
  }
}
