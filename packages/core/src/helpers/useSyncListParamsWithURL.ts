import { parse, stringify } from "query-string"
import { useLayoutEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useUpdateEffect } from "rooks"
import { GetListParams, SortOrder } from "../dataProvider"

function isEmpty(value: any) {
  if (value == null || value === "" || Object.keys(value).length === 0) {
    return true
  } else {
    return false
  }
}

function removeDefaults(params: GetListParams, defaults: GetListParams | undefined) {
  if (defaults == null) {
    return params
  }

  const { page, pageSize, sortField, sortOrder, filter } = params

  return {
    page: page !== defaults.page ? page : undefined,
    pageSize: pageSize !== defaults.pageSize ? pageSize : undefined,
    sortField: sortField !== defaults.sortField ? sortField : undefined,
    sortOrder: sortOrder !== defaults.sortOrder ? sortOrder : undefined,
    filter:
      JSON.stringify(filter) !== JSON.stringify(defaults.filter) ? filter : undefined,
  }
}

function getParamsToUpdate(
  values: Record<string, any>,
  current: GetListParams,
  defaults: GetListParams | undefined
): Partial<GetListParams> {
  let { page, pageSize, sortField, sortOrder, filter } = values

  // Check that incoming values have correct type, otherwise use defaults
  page = typeof page === "number" ? page : defaults?.page
  pageSize = typeof pageSize === "number" ? pageSize : defaults?.pageSize
  sortField = typeof sortField === "string" ? sortField : defaults?.sortField
  sortOrder =
    sortOrder === "asc" ? "asc" : sortOrder === "desc" ? "desc" : defaults?.sortOrder
  filter = filter ? filter : defaults?.filter

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

export type UseSyncListParamsWithURLOptions<TFilter = any> = {
  params: GetListParams
  setters: {
    setPage: (page: number) => void
    setPageSize: (pageSize: number) => void
    setSort: (field: string | undefined, order?: SortOrder) => void
    setFilter: (filter: TFilter) => void
  }
  defaults?: GetListParams
  enabled?: boolean
}

export function useSyncListParamsWithURL(options: UseSyncListParamsWithURLOptions) {
  const { params, setters, defaults, enabled = true } = options

  const { page, pageSize, sortField, sortOrder, filter } = params
  const { setPage, setPageSize, setSort, setFilter } = setters

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

    const { page, pageSize, sortField, sortOrder, filter } = getParamsToUpdate(
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
    if (filter != null) {
      setFilter(filter)
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
      filter: isEmpty(filter) ? undefined : filter,
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
  }, [page, pageSize, sortField, sortOrder, JSON.stringify(filter), enabled])
}
