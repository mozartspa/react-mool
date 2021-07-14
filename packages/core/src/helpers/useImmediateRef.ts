import { useRef } from "react"

export function useImmediateRef<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}
