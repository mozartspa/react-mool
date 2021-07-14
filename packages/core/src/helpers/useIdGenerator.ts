import { useCallback, useRef } from "react"

export function useIdGenerator(prefix: string = "") {
  const counter = useRef(0)
  const lastId = useRef<string | undefined>(undefined)

  const next = useCallback(() => {
    const count = counter.current++
    const id = `${prefix}${count}`
    lastId.current = id
    return id
  }, [])

  const getLastId = useCallback(() => {
    return lastId.current
  }, [])

  return [next, getLastId] as const
}
