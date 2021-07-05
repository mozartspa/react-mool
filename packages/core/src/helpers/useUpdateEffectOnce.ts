import { useRef } from "react"
import { useUpdateEffect } from "rooks"

export function useUpdateEffectOnce(fn: () => any, deps: any[]) {
  const fired = useRef(false)

  useUpdateEffect(() => {
    if (!fired.current) {
      fired.current = true
      return fn()
    }
  }, deps)
}
