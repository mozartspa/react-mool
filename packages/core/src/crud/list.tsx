import merge from "lodash.merge"
import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { UseQueryResult } from "react-query"
import {
  GetListOutput,
  GetListParams,
  RecordID,
  SortOrder,
  useGetList,
} from "../dataProvider"
import { useLastListParams } from "../helpers/useLastListParams"
import { useSyncListParamsWithURL } from "../helpers/useSyncListParamsWithURL"
import { useNotify } from "../notify"
import { ResourceContext, useResource } from "../resource"
import { useFilterStack, UseFilterStackAdd } from "./filter"
import { LoadListErrorHandler, LoadListSuccessHandler } from "./types"

function defaultMergeFilters<TFilter = any>(...filters: TFilter[]): TFilter {
  return merge({}, ...filters)
}

export type MergeFiltersFunc<TFilter = any> = (
  ...filters: Array<TFilter | undefined>
) => TFilter | undefined

export type UseListOptions<TRecord = any, TFilter = any> = {
  resource?: string
  initialPage?: number
  initialPageSize?: number
  initialSortField?: string
  initialSortOrder?: SortOrder
  initialSelectedIds?: RecordID[]
  baseFilter?: TFilter
  mergeFilters?: MergeFiltersFunc<TFilter>
  onLoadSuccess?: LoadListSuccessHandler<TRecord>
  onLoadError?: LoadListErrorHandler<TFilter>
  syncWithURL?: boolean
  restoreFromLast?: boolean
  restoreKey?: string
}

export type UseListResult<TRecord = any, TFilter = any> = {
  resource: string
  items: TRecord[]
  total: number
  page: number
  pageSize: number
  sortField?: string | undefined
  sortOrder?: SortOrder
  filter?: TFilter | undefined
  selectedIds: RecordID[]
  isLoading: boolean
  isLoaded: boolean
  query: UseQueryResult<GetListOutput<TRecord>>
  defaults: {
    page: number
    pageSize: number
    sortField?: string | undefined
    sortOrder: SortOrder
  }
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  setSort: (field: string | undefined, order?: SortOrder) => void
  setSelectedIds: (ids: RecordID[]) => void
  reset: () => void
  addFilter: UseFilterStackAdd<TFilter>
  baseFilter: TFilter | undefined
  mergeFilters: MergeFiltersFunc<TFilter>
}

export function useList<TRecord = any, TFilter = any>(
  options: UseListOptions<TRecord, TFilter> = {}
): UseListResult<TRecord, TFilter> {
  const {
    resource: resourceOpt,
    initialPage = 1,
    initialPageSize = 20,
    initialSortField,
    initialSortOrder = "asc",
    initialSelectedIds = [],
    baseFilter,
    mergeFilters = defaultMergeFilters,
    onLoadSuccess,
    onLoadError,
    syncWithURL = true,
    restoreFromLast = true,
    restoreKey,
  } = options

  const resource = useResource(resourceOpt)
  const notify = useNotify()

  const [page, setPage] = useState(Math.max(1, initialPage))
  const [pageSize, setPageSize] = useState(Math.max(1, initialPageSize))
  const [sortField, setSortField] = useState(initialSortField)
  const [sortOrder, setSortOrder] = useState(initialSortOrder)
  const [selectedIds, setSelectedIds] = useState(initialSelectedIds)
  const filterStack = useFilterStack()

  // Merge filters in reverse order, so the first filter takes precedence over the others.
  const mergedFilter = useMemo(
    () => mergeFilters(...filterStack.entries.reverse(), baseFilter),
    [baseFilter, filterStack.entries]
  )

  const listParams: GetListParams<TFilter> = {
    page: page,
    pageSize: pageSize,
    sortField: sortField,
    sortOrder: sortOrder,
    filter: mergedFilter,
  }

  const query = useGetList<TRecord, TFilter>(listParams, {
    resource,
    onSuccess: ({ items, total }) => {
      onLoadSuccess?.({ items, total })
    },
    onError: (error) => {
      // default handler
      const handleError = () => {
        const message = error instanceof Error ? error.message : String(error)
        notify(message, { type: "danger" })
      }

      // call custom handler, if any, or the default handler
      if (onLoadError) {
        onLoadError({ error, listParams }, handleError)
      } else {
        handleError()
      }
    },
  })

  const setSort = useCallback(
    (field: string | undefined, order?: SortOrder) => {
      setSortField(field)
      setSortOrder((prev) => order || prev)
    },
    [setSortField, setSortOrder]
  )

  const updatePage = useCallback(
    (page: number) => {
      // Prevent page value to be outside of possibile pages calculated by the number of items
      if (query.data?.total != null) {
        const maxPage = Math.ceil(query.data.total / pageSize)
        page = Math.min(page, maxPage)
      }
      // Min page is 1
      page = Math.max(1, page)
      // Update it
      setPage(page)
    },
    [pageSize, query.data?.total]
  )

  const updatePageSize = useCallback(
    (pageSize: number) => {
      setPageSize(Math.max(1, pageSize))
    },
    [page]
  )

  const reset = useCallback(() => {
    setPage(initialPage)
    setPageSize(initialPageSize)
    setSortField(initialSortField)
    setSortOrder(initialSortOrder)
  }, [])

  // Ensure page value is within the bounds
  useEffect(() => {
    if (query.data?.total != null) {
      const minPage = 1
      const maxPage = Math.max(1, Math.ceil(query.data.total / pageSize))
      if (page < minPage) {
        setPage(minPage)
      } else if (page > maxPage) {
        setPage(maxPage)
      }
    }
  }, [page, query.data?.total])

  const defaults = useMemo(
    () => ({
      page: initialPage,
      pageSize: initialPageSize,
      sortField: initialSortField,
      sortOrder: initialSortOrder,
    }),
    [initialPage, initialPageSize, initialSortField, initialSortOrder]
  )

  const setters = {
    setPage: updatePage,
    setPageSize: updatePageSize,
    setSort,
    setSelectedIds,
    reset,
  }

  useSyncListParamsWithURL({
    params: listParams,
    setters,
    defaults,
    enabled: syncWithURL,
  })

  useLastListParams({
    params: listParams,
    setters,
    storageKey: restoreKey ?? `${resource}-lastparams`,
    enabled: restoreFromLast,
  })

  return {
    resource,
    items: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    selectedIds,
    ...listParams,
    ...setters,
    isLoading: query.isLoading || (query.isPreviousData && query.isFetching),
    isLoaded: !query.isLoading && !query.isError,
    query,
    defaults,
    addFilter: filterStack.add,
    baseFilter,
    mergeFilters,
  }
}

export const ListContext = React.createContext<UseListResult | undefined>(undefined)

export function useListContext<TRecord = any, TFilter = any>() {
  const context = React.useContext<UseListResult<TRecord, TFilter> | undefined>(
    ListContext
  )
  if (!context) {
    throw new Error(`ListContext not found.`)
  }
  return context
}

export type ListBaseProps<TRecord = any, TFilter = any> = UseListOptions<
  TRecord,
  TFilter
> & {
  children: ReactNode | ((list: UseListResult<TRecord, TFilter>) => ReactElement)
}

export const ListBase = (options: ListBaseProps) => {
  const { children, ...listOptions } = options
  const list = useList(listOptions)

  const body = children instanceof Function ? children(list) : children

  return (
    <ResourceContext.Provider value={list.resource}>
      <ListContext.Provider value={list}>{body}</ListContext.Provider>
    </ResourceContext.Provider>
  )
}
