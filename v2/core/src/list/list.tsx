import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  GetID,
  GetListParams,
  GetListQueryResolver,
  QueryFromResolver,
  SortOrder,
  useQuery,
} from "../data"
import { useNotify } from "../notify"

export type LoadListSuccessHandler<TRecord = any> = (arg: {
  items: TRecord[]
  total: number
}) => void

export type LoadListErrorHandler<TFilter = any> = (
  arg: {
    error: any
    listParams: GetListParams<TFilter>
  },
  defaultHandler: () => void
) => void

export type UseListOptions<TRecord = any, TFilter = any, TRecordID = any> = {
  query: QueryFromResolver<GetListQueryResolver<TRecord, TFilter>>
  getId?: GetID<TRecord, TRecordID>
  filter?: TFilter
  initialPage?: number
  initialPageSize?: number
  initialSortField?: string
  initialSortOrder?: SortOrder
  initialSelectedIds?: TRecordID[]
  onLoadSuccess?: LoadListSuccessHandler<TRecord>
  onLoadError?: LoadListErrorHandler<TFilter>
}

export type UseListResult<TRecord = any, TFilter = any, TRecordID = any> = {
  items: TRecord[]
  total: number
  page: number
  pageSize: number
  sortField?: string | undefined
  sortOrder?: SortOrder
  filter?: TFilter | undefined
  selectedIds: TRecordID[]
  isLoading: boolean
  isLoaded: boolean
  defaults: {
    page: number
    pageSize: number
    sortField?: string | undefined
    sortOrder: SortOrder
  }
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  setSort: (field: string | undefined, order?: SortOrder) => void
  setSelectedIds: (ids: TRecordID[]) => void
  reset: () => void
  getId?: GetID<TRecord, TRecordID>
}

export function useList<TRecord = any, TFilter = any, TRecordID = any>(
  options: UseListOptions<TRecord, TFilter, TRecordID>
): UseListResult<TRecord, TFilter, TRecordID> {
  const {
    query: queryFn,
    getId,
    filter,
    initialPage = 1,
    initialPageSize = 20,
    initialSortField,
    initialSortOrder = "asc",
    initialSelectedIds = [],
    onLoadSuccess,
    onLoadError,
  } = options

  const notify = useNotify()

  // Restored values take precedence over user initial values
  const initialValues = useMemo(() => {
    return {
      page: Math.max(1, initialPage),
      pageSize: Math.max(1, initialPageSize),
      sortField: initialSortField,
      sortOrder: initialSortOrder,
      selectedIds: initialSelectedIds,
    }
  }, [])

  const [page, setPage] = useState(initialValues.page)
  const [pageSize, setPageSize] = useState(initialValues.pageSize)
  const [sortField, setSortField] = useState(initialValues.sortField)
  const [sortOrder, setSortOrder] = useState(initialValues.sortOrder)
  const [selectedIds, setSelectedIds] = useState(initialValues.selectedIds)

  const listParams: GetListParams<TFilter> = {
    page: page,
    pageSize: pageSize,
    sortField: sortField,
    sortOrder: sortOrder,
    filter,
  }

  const [data, queryMeta] = useQuery(queryFn, listParams, {
    suspense: false,
    keepPreviousData: true,
    onSuccess: ({ items, total }) => {
      onLoadSuccess?.({ items, total })
    },
    onError: (error) => {
      // default handler
      const handleError = () => {
        const message = error instanceof Error ? error.message : String(error)
        notify.danger(message)
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
      if (data?.total != null) {
        const maxPage = Math.ceil(data.total / pageSize)
        page = Math.min(page, maxPage)
      }
      // Min page is 1
      page = Math.max(1, page)
      // Update it
      setPage(page)
    },
    [pageSize, data?.total]
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
    if (data?.total != null) {
      const minPage = 1
      const maxPage = Math.max(1, Math.ceil(data.total / pageSize))
      if (page < minPage) {
        setPage(minPage)
      } else if (page > maxPage) {
        setPage(maxPage)
      }
    }
  }, [page, data?.total])

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

  return {
    items: data?.items ?? [],
    total: data?.total ?? 0,
    selectedIds,
    ...listParams,
    ...setters,
    isLoading: queryMeta.isLoading || (queryMeta.isPreviousData && queryMeta.isFetching),
    isLoaded: !queryMeta.isLoading && !queryMeta.isError,
    defaults,
    getId,
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

export type ListProps<TRecord = any, TFilter = any> = UseListOptions<TRecord, TFilter> & {
  children: ReactNode | ((list: UseListResult<TRecord, TFilter>) => ReactElement)
}

export const List = (options: ListProps) => {
  const { children, ...listOptions } = options
  const list = useList(listOptions)

  const body = children instanceof Function ? children(list) : children

  return <ListContext.Provider value={list}>{body}</ListContext.Provider>
}
