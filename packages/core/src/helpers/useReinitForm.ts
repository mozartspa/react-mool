import { Form } from "@mozartspa/mobx-form"
import { useEffect, useRef, useState } from "react"
import { RecordID } from "../dataProvider"

export type UseReinitFormOptions = {
  form: Form
  recordId: RecordID
  record: any
  getValues: (record: any) => any
  isFetching: boolean
}

export function useReinitForm(options: UseReinitFormOptions) {
  const { form, recordId, record, getValues, isFetching } = options

  const [isReady, setReady] = useState(false)
  const [lastRecordId, setLastRecordId] = useState(recordId)
  const waitingForFetching = useRef(true)

  useEffect(() => {
    if (isReady) {
      if (lastRecordId === recordId) {
        return // do it once per recordId
      } else {
        waitingForFetching.current = true
        setReady(false)
      }
    }

    // freeze form asap
    form.freeze()

    // wait for fetching
    if (waitingForFetching.current) {
      if (isFetching) {
        waitingForFetching.current = false
      }
    } else if (!isFetching) {
      // fetching stopped, we can reinit
      form.unfreeze()
      form.reset(getValues(record))
      setReady(true)
      setLastRecordId(recordId)
    }
  }, [recordId, record, getValues, isFetching, form])

  return {
    isReady,
  }
}
