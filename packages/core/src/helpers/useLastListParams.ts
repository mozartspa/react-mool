import { useLayoutEffect } from "react"
import { useSessionstorage } from "rooks"
import { GetListParams, SortOrder } from "../dataProvider"
import { useImmediateRef } from "./useImmediateRef"

function getParamsToUpdate(
  values: Record<string, any> | null | undefined,
  current: GetListParams
): Partial<GetListParams> {
  if (!values) {
    return {}
  }

  let { page, pageSize, sortField, sortOrder, filter } = values

  // Check that incoming values have correct type
  page = typeof page === "number" ? page : undefined
  pageSize = typeof pageSize === "number" ? pageSize : undefined
  sortField = typeof sortField === "string" ? sortField : undefined
  sortOrder = sortOrder === "asc" ? "asc" : sortOrder === "desc" ? "desc" : undefined
  filter = filter ? filter : undefined

  // Clear the values that should not be changed
  if (page === current.page) {
    page = undefined
  }
  if (pageSize === current.pageSize) {
    pageSize = undefined
  }
  if (sortField === current.sortField) {
    sortField = undefined
  }
  if (sortOrder === current.sortOrder) {
    sortOrder = undefined
  }
  if (JSON.stringify(filter) === JSON.stringify(current.filter)) {
    filter = undefined
  }

  return {
    page,
    pageSize,
    sortField,
    sortOrder,
    filter,
  }
}

export type UseLastListParamsOptions = {
  params: GetListParams
  setters: {
    setPage: (page: number) => void
    setPageSize: (pageSize: number) => void
    setSort: (field: string | undefined, order?: SortOrder) => void
  }
  storageKey: string
  enabled?: boolean
}

export function useLastListParams(options: UseLastListParamsOptions) {
  const { params, setters, storageKey, enabled = true } = options

  const [value, setValue] = useSessionstorage(storageKey)

  const paramsRef = useImmediateRef(params)
  const enableRef = useImmediateRef(enabled)

  useLayoutEffect(() => {
    if (!enableRef.current) {
      return
    }

    const { page, pageSize, sortField, sortOrder } = getParamsToUpdate(value, params)

    if (page != null) {
      setters.setPage(page)
    }
    if (pageSize != null) {
      setters.setPageSize(pageSize)
    }
    if (sortField != null) {
      setters.setSort(sortField, sortOrder)
    }

    return () => {
      if (enableRef.current) {
        setValue(paramsRef.current)
      }
    }
  }, [])
}
