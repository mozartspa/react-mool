import { useCallback } from "react"
import { useQueryClient } from "react-query"

export function useRefresh() {
  const queryClient = useQueryClient()

  const refresh = useCallback(() => {
    return queryClient.refetchQueries({ active: true })
  }, [queryClient])

  return refresh
}
