import { parse, stringify } from "query-string"
import { useLayoutEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useUpdateEffect } from "rooks"
import { useImmediateRef } from "./useImmediateRef"

function isEmpty(value: any) {
  return value == null || value === ""
}

export type UseSyncWithURLOptions = {
  value: string | null | undefined
  onChange: (value: string) => void
  queryParam: string
  enabled?: boolean
  historyMode?: "push" | "replace"
}

export function useSyncWithURL(options: UseSyncWithURLOptions) {
  const { value, onChange, queryParam, enabled = true, historyMode = "push" } = options

  const history = useHistory()
  const location = useLocation()
  const valueRef = useImmediateRef(value)
  const onChangeRef = useImmediateRef(onChange)

  // Update value from location
  useLayoutEffect(() => {
    if (!enabled) {
      return
    }

    const query = parse(location.search)
    const queryParamValue = query[queryParam]
    const queryParamValueAsString = String(queryParamValue)

    // update only if value is not empty and it changed
    if (!isEmpty(queryParamValue) && queryParamValueAsString !== valueRef.current) {
      onChangeRef.current(queryParamValueAsString)
    }
  }, [location.search, enabled, queryParam])

  // Update location from value
  useUpdateEffect(() => {
    if (!enabled) {
      return
    }

    let params = parse(location.search)

    if (!isEmpty(value)) {
      params[queryParam] = value!
    }

    const search = stringify(params)

    if (history.location.search !== `?${search}`) {
      const historyFunc = historyMode === "push" ? history.push : history.replace
      historyFunc({
        search,
        state: {
          // Disable scrollToTop when changing location
          scrollToTop: false,
        },
      })
    }
  }, [value, queryParam, enabled])
}
