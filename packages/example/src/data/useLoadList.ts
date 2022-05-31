import { GetListOutput, GetListParams } from "@react-mool/core"
import { useQuery, UseQueryOptions } from "react-query"
import { GetListQueryFn } from "./createGetListHook"

export type ResourceProvider<TRecord = any, TFilter = any> = {
  cacheKey: string
  getList: GetListQueryFn<TRecord, TFilter>
}

export function createResource<TRecord = any, TFilter = any>(
  options: ResourceProvider<TRecord, TFilter>
) {
  return options
}

export function useLoadList<TRecord = any, TFilter = any>(
  resource: ResourceProvider<TRecord, TFilter>,
  params: GetListParams<TFilter>,
  options?: UseQueryOptions<GetListOutput<TRecord>>
) {
  return useQuery({
    queryKey: [resource.cacheKey, params],
    queryFn: () => resource.getList(params),
    ...options,
  })
}
