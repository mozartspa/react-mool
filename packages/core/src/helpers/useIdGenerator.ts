import { useCallback, useRef } from "react"

export function useIdGenerator(prefix: string = "") {
  const counter = useRef(0)
  const next = useCallback(() => {
    const id = counter.current++
    return `${prefix}${id}`
  }, [])

  return next
}
