import { useQuery, UseQueryOptions } from "react-query"
import { Product } from "../generated"

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

const useProduct = createQueryHook({
  cacheKeyPrefix: "product",
  queryFn: async ({ id }: { id: string }) => {
    // ...
    return {} as Product
  },
})

// queries
const getProduct = async (id: string) => {
  // ...
  return {}
}
const getProducts = async (params: { page: number; pageSize: number }) => {
  // ...
  return [
    {
      ciccio: "ciao",
    },
  ]
}

type Func = (arg: any) => Promise<any>

type PromiseValue<T> = T extends (...args: any) => Promise<infer U> ? U : never

function useMoolQuery<FN extends Func>(fn: FN, arg: Parameters<FN>[0]) {
  const query = useQuery({
    queryKey: ["todo", arg],
    queryFn: async () => {
      const result = await fn(arg)
      return result as PromiseValue<FN>
    },
    suspense: true,
  })

  return [query.data!, query] as const
}

const MyComp = () => {
  const [products] = useMoolQuery(getProducts, { page: 1, pageSize: 10 })

  const x = products[0].ciccio
}

// mutations
