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

  const query = useQuery(
    [resource, String(id)],
    () => {
      return dataProvider.getOne({ id })
    },
    {
      initialData: () => {
        // Find cache data in list queries
        const listCache: GetListOutput | undefined = queryClient.getQueryData(
          [resource, "list"],
          {
            exact: false,
          }
        )
        if (listCache && listCache.items) {
          return listCache.items.find((o) => dataProvider.id(o) === id)
        } else {
          return undefined
        }
      },
      ...options,
    }
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
