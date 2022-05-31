import { GetListOutput, GetListParams } from "@react-mool/core"
import { uniqueId } from "lodash"
import { useQuery, UseQueryOptions } from "react-query"

export type CreateGetListHookOptions<TRecord = any, TFilter = any> = {
  queryFn: (params: GetListParams<TFilter>) => Promise<GetListOutput<TRecord>>
  prefixKey?: string
}

export type GetListQueryFn<TRecord = any, TFilter = any> = (
  params: GetListParams<TFilter>
) => Promise<GetListOutput<TRecord>>

export function createGetListHook<TRecord = any, TFilter = any>(
  queryFn: GetListQueryFn<TRecord, TFilter>
) {
  return (
    params: GetListParams<TFilter>,
    options: UseQueryOptions<GetListOutput<TRecord>>
  ) => {
    return useQuery({
      queryFn: () => queryFn(params),
      queryKey: [getQueryKeyPrefix(queryFn), params],
      ...options,
    })
  }
}

const prefixFnMap = new WeakMap<Function, string>()

function getQueryKeyPrefix(fn: GetListQueryFn) {
  let prefix = prefixFnMap.get(fn)
  if (prefix == null) {
    prefix = uniqueId()
    prefixFnMap.set(fn, prefix)
  }

  return prefix
}
