import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useQuery, UseQueryResult } from "react-query"
import { LoadListErrorHandler, LoadListSuccessHandler } from "../crud"
import { GetListOutput, GetListParams, RecordID, SortOrder } from "../dataProvider"
import { useStorage } from "../helpers/useStorage"
import { useNotify } from "../notify"

export namespace Exp {
  export type QueryListFunc<TRecord, TFilter> = (
    params: GetListParams<TFilter>
  ) => Promise<GetListOutput<TRecord>>

  export function createQueryListFunc<TRecord, TFilter>(
    fn: QueryListFunc<TRecord, TFilter>
  ) {
    return fn
  }

  export type UseListOptions<TRecord = any, TFilter = any> = {
    query: QueryListFunc<TRecord, TFilter>
    filter?: TFilter
    initialPage?: number
    initialPageSize?: number
    initialSortField?: string
    initialSortOrder?: SortOrder
    initialSelectedIds?: RecordID[]
    onLoadSuccess?: LoadListSuccessHandler<TRecord>
    onLoadError?: LoadListErrorHandler<TFilter>
    syncWithURL?: boolean
    restoreFromLast?: boolean
    restoreKey?: string
    restoreStorage?: Storage
  }

  export type UseListResult<TRecord = any, TFilter = any> = {
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
  }

  export function useList<TRecord = any, TFilter = any>(
    options: UseListOptions<TRecord, TFilter>
  ): UseListResult<TRecord, TFilter> {
    const {
      query: queryFn,
      filter,
      initialPage = 1,
      initialPageSize = 20,
      initialSortField,
      initialSortOrder = "asc",
      initialSelectedIds = [],
      onLoadSuccess,
      onLoadError,
      //syncWithURL = true,
      restoreKey,
      restoreStorage,
    } = options

    const notify = useNotify()
    const restoreFromLast = restoreKey !== undefined
    const storage = useStorage(restoreKey ?? "list-lastparams", {
      enabled: restoreFromLast,
      storage: restoreStorage,
    })

    // Restored values take precedence over user initial values
    const initialValues = useMemo(
      () => {
        return {
          page: storage.getValue("page", Math.max(1, initialPage)),
          pageSize: storage.getValue("pageSize", Math.max(1, initialPageSize)),
          sortField: storage.getValue("sortField", initialSortField),
          sortOrder: storage.getValue("sortOrder", initialSortOrder),
          selectedIds: storage.getValue("selectedIds", initialSelectedIds),
        }
      },
      // eslint-disable-next-line
      []
    )

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

    const query = useQuery({
      queryKey: ["list", listParams],
      queryFn: () => queryFn(listParams),
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

    const updatePageSize = useCallback((pageSize: number) => {
      setPageSize(Math.max(1, pageSize))
    }, [])

    const reset = useCallback(() => {
      setPage(initialPage)
      setPageSize(initialPageSize)
      setSortField(initialSortField)
      setSortOrder(initialSortOrder)
    }, [initialPage, initialPageSize, initialSortField, initialSortOrder])

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
    }, [page, pageSize, query.data?.total])

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

    // useSyncListParamsWithURL({
    //   params: listParams,
    //   setters,
    //   defaults,
    //   enabled: syncWithURL,
    // })

    // Update values to be restored
    useEffect(() => {
      storage.set({ page, pageSize, sortField, sortOrder, selectedIds })
    }, [storage, page, pageSize, sortField, sortOrder, selectedIds])

    return {
      items: query.data?.items ?? [],
      total: query.data?.total ?? 0,
      selectedIds,
      ...listParams,
      ...setters,
      isLoading: query.isLoading || (query.isPreviousData && query.isFetching),
      isLoaded: !query.isLoading && !query.isError,
      query,
      defaults,
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

  export const ListBase = <TRecord extends any, TFilter extends any>(
    options: ListBaseProps<TRecord, TFilter>
  ) => {
    const { children, ...listOptions } = options
    const list = useList(listOptions)

    const body = children instanceof Function ? children(list) : children

    return <ListContext.Provider value={list}>{body}</ListContext.Provider>
  }

  export type QueryListItemType<T extends QueryListFunc<any, any>> =
    T extends QueryListFunc<infer U, any> ? U : never
}
