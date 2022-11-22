import { FormContext } from "@mozartspa/mobx-form"
import { RecordContext, useCrudMode, useObserveMobxValue } from "@react-mool/core"
import get from "dlv"
import React from "react"

export function useControlValue<TValue = any>(name: string): TValue {
  const crudMode = useCrudMode()
  const form = React.useContext(FormContext)
  const recordContext = React.useContext(RecordContext)

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
    if (!recordContext) {
      throw new Error("RecordContext not available")
    }

    return get(recordContext.record, name)
  }
}
