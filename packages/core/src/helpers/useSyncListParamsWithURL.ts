import { parse, stringify } from "query-string"
import { useLayoutEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useUpdateEffect } from "rooks"
import { SortOrder } from "../dataProvider"

function removeDefaults(
  params: UseSyncListParams,
  defaults: UseSyncListParams | undefined
) {
  if (defaults == null) {
    return params
  }

  const { page, sortField, sortOrder } = params

  return {
    page: page !== defaults.page ? page : undefined,
    sortField: sortField !== defaults.sortField ? sortField : undefined,
    sortOrder: sortOrder !== defaults.sortOrder ? sortOrder : undefined,
  }
}

function getParamsToUpdate(
  values: Record<string, any>,
  current: UseSyncListParams,
  defaults: UseSyncListParams | undefined
): UseSyncListParams {
  let { page, sortField, sortOrder } = values

  // Check that incoming values have correct type, otherwise use defaults
  page = typeof page === "number" ? page : defaults?.page
  sortField = typeof sortField === "string" ? sortField : defaults?.sortField
  sortOrder =
    sortOrder === "asc" ? "asc" : sortOrder === "desc" ? "desc" : defaults?.sortOrder

  // Clear the values that should not be changed
  if (page === current.page) {
    page = undefined
  }
  if (sortField === current.sortField) {
    sortField = undefined
  }
  if (sortOrder === current.sortOrder) {
    sortOrder = undefined
  }

  return {
    page,
    sortField,
    sortOrder,
  }
}

export type UseSyncListParams = {
  page: number
  sortField?: string
  sortOrder?: SortOrder
}

export type UseSyncListParamsWithURLOptions = {
  params: UseSyncListParams
  setters: {
    setPage: (page: number) => void
    setSort: (field: string | undefined, order?: SortOrder) => void
  }
  defaults?: UseSyncListParams
  enabled?: boolean
}

export function useSyncListParamsWithURL(options: UseSyncListParamsWithURLOptions) {
  const { params, setters, defaults, enabled = true } = options

  const { page, sortField, sortOrder } = params
  const { setPage, setSort } = setters

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

    const { page, sortField, sortOrder } = getParamsToUpdate(
      query,
      params,
      options.defaults
    )

    // update only the params that should be changed
    if (page != null) {
      setPage(page)
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
        state: {
          // Disable scrollToTop when changing location
          _scrollToTop: false,
        },
      })
    }
  }, [page, sortField, sortOrder, enabled])
}
