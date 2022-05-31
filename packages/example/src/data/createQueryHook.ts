import { useQuery, UseQueryOptions } from "react-query"

export type CreateQueryHookOptions<TInput = any, TOutput = any> = {
  cacheKeyPrefix: string
  queryFn: (input: TInput) => Promise<TOutput>
}

export function createQueryHook<TInput = any, TOutput = any>(
  options: CreateQueryHookOptions<TInput, TOutput>
) {
  const { cacheKeyPrefix, queryFn } = options

  return (params: TInput, queryOptions?: UseQueryOptions<TOutput>) => {
    return useQuery({
      queryKey: [cacheKeyPrefix, params],
      queryFn: () => queryFn(params),
      ...queryOptions,
    })
  }
}
