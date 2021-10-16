import { useGeneratedHtmlId } from "@elastic/eui"
import { useCallback } from "react"

function stringifyValue(value: any) {
  if (typeof value === "string") {
    return value
  } else if (typeof value === "number") {
    return String(value)
  } else {
    return JSON.stringify(value)
  }
}

export function useValueToId() {
  const prefix = useGeneratedHtmlId()

  const valueToId = useCallback(
    (value: any) => {
      return `${prefix}_${stringifyValue(value)}`
    },
    [prefix]
  )

  return valueToId
}
