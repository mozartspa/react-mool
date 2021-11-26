import { useCallback, useEffect, useRef } from "react"

export function useIsMounted() {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const isMounted = useCallback(() => mountedRef.current, [])

  return isMounted
}
