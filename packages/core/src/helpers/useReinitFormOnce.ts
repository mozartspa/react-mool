import { Form } from "@mozartspa/mobx-form"
import { useEffect, useRef, useState } from "react"

export type UseReinitFormOptions = {
  form: Form
  record: any
  getValues: (record: any) => any
  isFetching: boolean
}

export function useReinitFormOnce(options: UseReinitFormOptions) {
  const { form, record, getValues, isFetching } = options

  const [isReady, setReady] = useState(false)
  const waitingForFetching = useRef(true)

  useEffect(() => {
    if (isReady) {
      return // do it once
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
    }
  }, [record, getValues, isFetching, form])

  return {
    isReady,
  }
}
