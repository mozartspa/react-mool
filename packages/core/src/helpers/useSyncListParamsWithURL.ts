import { parse, stringify } from "query-string"
import { useLayoutEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useUpdateEffect } from "rooks"
import { GetListParams, SortOrder } from "../dataProvider"

function removeDefaults(params: GetListParams, defaults: GetListParams | undefined) {
  if (defaults == null) {
    return params
  }

  const { page, pageSize, sortField, sortOrder } = params

  return {
    page: page !== defaults.page ? page : undefined,
    pageSize: pageSize !== defaults.pageSize ? pageSize : undefined,
    sortField: sortField !== defaults.sortField ? sortField : undefined,
    sortOrder: sortOrder !== defaults.sortOrder ? sortOrder : undefined,
  }
}

function getParamsToUpdate(
  values: Record<string, any>,
  current: GetListParams,
  defaults: GetListParams | undefined
): Partial<GetListParams> {
  let { page, pageSize, sortField, sortOrder } = values

  // Check that incoming values have correct type, otherwise use defaults
  page = typeof page === "number" ? page : defaults?.page
  pageSize = typeof pageSize === "number" ? pageSize : defaults?.pageSize
  sortField = typeof sortField === "string" ? sortField : defaults?.sortField
  sortOrder =
    sortOrder === "asc" ? "asc" : sortOrder === "desc" ? "desc" : defaults?.sortOrder

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

  return {
    page,
    pageSize,
    sortField,
    sortOrder,
  }
}

export type UseSyncListParamsWithURLOptions = {
  params: GetListParams
  setters: {
    setPage: (page: number) => void
    setPageSize: (pageSize: number) => void
    setSort: (field: string | undefined, order?: SortOrder) => void
  }
  defaults?: GetListParams
  enabled?: boolean
}

export function useSyncListParamsWithURL(options: UseSyncListParamsWithURLOptions) {
  const { params, setters, defaults, enabled = true } = options

  const { page, pageSize, sortField, sortOrder } = params
  const { setPage, setPageSize, setSort } = setters

  const history = useHistory()
  const location = useLocation()

  // Update params from location
  useLayoutEffect(() => {
    if (!enabled) {
      return
    }

    const query = parse(location.search, {
      parseNumbers: true,
      parseBooleans: true,
    })

    const { page, pageSize, sortField, sortOrder } = getParamsToUpdate(
      query,
      params,
      options.defaults
    )

    // update only the params that should be changed
    if (page != null) {
      setPage(page)
    }
    if (pageSize != null) {
      setPageSize(pageSize)
    }
    if (sortField != null) {
      setSort(sortField, sortOrder)
    }
  }, [location.search, enabled])

  // Update location from params
  useUpdateEffect(() => {
    if (!enabled) {
      return
    }

    const params = {
      page,
      pageSize,
      sortField,
      sortOrder,
    }

    const search = stringify({
      ...parse(location.search),
      ...removeDefaults(params, defaults),
    })

    if (history.location.search !== `?${search}`) {
      history.push({
        search,
      })
    }
  }, [page, pageSize, sortField, sortOrder, enabled])
}
