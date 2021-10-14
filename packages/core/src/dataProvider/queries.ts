import { useQuery, useQueryClient, UseQueryOptions } from "react-query"
import { useResource } from "../resource"
import {
  GetListOutput,
  GetListParams,
  RecordID,
  useResourceDataProvider,
} from "./dataProvider"

export type UseGetOneOptions<TRecord = any> = UseQueryOptions<TRecord> & {
  resource?: string
}

export type UseGetManyOptions<TRecord = any> = UseQueryOptions<
  (TRecord | undefined)[]
> & {
  resource?: string
}

export type UseGetListOptions<TRecord = any> = UseQueryOptions<GetListOutput<TRecord>> & {
  resource?: string
}

export function useGetOne<TRecord = any>(
  id: RecordID,
  options: UseGetOneOptions<TRecord> = {}
) {
  const resource = useResource(options.resource)
  const dataProvider = useResourceDataProvider<TRecord>(resource)
  const queryClient = useQueryClient()
  const idString = String(id)

  const query = useQuery(
    [resource, idString],
    () => {
      return dataProvider.getOne({ id })
    },
    {
      initialData: () => {
        // Find cache data in list queries
        const listQueries = queryClient
          .getQueryCache()
          .findAll([resource, "list"], { exact: false })
          .sort((a, b) => {
            return b.state.dataUpdatedAt - a.state.dataUpdatedAt
          })

        for (const query of listQueries) {
          const cache = query.state.data as GetListOutput | undefined
          const item = cache?.items.find((o) => String(dataProvider.id(o)) === idString)
          if (item) {
            return item
          }
        }

        // Not found in cache
        return undefined
      },
      ...options,
    }
  )

  return query
}

export function useGetMany<TRecord = any>(
  ids: RecordID[],
  options: UseGetManyOptions<TRecord> = {}
) {
  const resource = useResource(options.resource)
  const dataProvider = useResourceDataProvider<TRecord>(resource)
  const idsString = `[${ids.join(",")}]`

  const query = useQuery(
    [resource, idsString],
    () => {
      return Promise.all(
        ids.map(async (id) => {
          try {
            return await dataProvider.getOne({ id })
          } catch (err) {
            return undefined
          }
        })
      )
    },
    options
  )

  return query
}

export function useGetList<TRecord = any, TFilter = any>(
  params: GetListParams<TFilter>,
  options: UseGetListOptions<TRecord> = {}
) {
  const resource = useResource(options.resource)
  const dataProvider = useResourceDataProvider<TRecord>(resource)
  const query = useQuery(
    [resource, "list", params],
    () => {
      return dataProvider.getList(params)
    },
    {
      keepPreviousData: true,
      ...options,
    }
  )

  return query
}
