import { GetListQueryFn } from "./createGetListHook"

type DataSourceConfig = {
  [name: string]: (params: any) => Promise<any>
}

type WithCacheKeyPrefix<T> = T & { cacheKeyPrefix: string[] }

type DataSource<Config extends DataSourceConfig = DataSourceConfig> = {
  [P in keyof Config]: WithCacheKeyPrefix<Config[P]>
}

type Func = (...args: any[]) => any

function cloneFunc<T extends Func>(func: T): T {
  return ((...args: any[]) => func(...args)) as T
}

export function createDataSource<Config extends DataSourceConfig>(
  cacheKeyPrefix: string,
  config: Config
): DataSource<Config> {
  const dataSource = {} as DataSource<Config>
  const fields = Object.keys(config) as (keyof Config)[]

  fields.forEach((field) => {
    const func = cloneFunc(config[field]) as any
    func.cacheKeyPrefix = [cacheKeyPrefix, String(field)]
    dataSource[field] = func
  })

  return dataSource
}

type CustomQuery<I = any, O = any> = (args: I) => Promise<O>

export type ResourceProviderConfig<TRecord = any, TFilter = any> = {
  cacheKey: string
  queries: {
    getList: GetListQueryFn<TRecord, TFilter>
    [name: string]: CustomQuery
  }
}

type FuncWithKey<T extends Function> = T & {
  cacheKey: string
}

type ResourceQueries<T extends ResourceProviderConfig> = {
  [P in keyof T["queries"]]: FuncWithKey<T["queries"][P]>
}

//type ResourceQueries<T extends ResourceProviderConfig> = T["queries"]["getList"]

export function createResourceQueries<Config extends ResourceProviderConfig>(
  options: Config
): ResourceQueries<Config> {
  const q = { ...options.queries }

  return q as any
}

//type ExtractQueryNames<Provider extends ResourceProvider> =
//  Provider[keyof Provider] extends Function ? keyof Provider : never

const p = createResourceQueries({
  cacheKey: "p",
  queries: {
    getList: async () => {
      return {
        items: [{ ciao: true }],
        total: 0,
      }
    },
    other: async () => {
      return {
        items: [{ ciao: true }],
        total: 0,
      }
    },
  },
})

const zzz = p.getList.cacheKey
/*
type Func = (...args: any[]) => any
type P = typeof p
type X = ExtractQueryNames<P>
type Y = Func extends P[keyof typeof p] ? P[keyof typeof p] : false

type IsFunc<T, P extends keyof T> = T[P] extends Func ? P : never

type OnlyFunc<T> = keyof {
  [P in keyof T as IsFunc<T, P>]: T[P]
}
type Z = OnlyFunc<P>

const y: Y = "getList"

type ToArray<Type> = Type extends number ? Type[] : never
type StrArrOrNumArr = ToArray<string | number>

export function useResourceQuery<
  Provider extends ResourceProvider,
  QueryName extends keyof Provider
>(
  resource: Provider,
  queryName: QueryName,
  params: Parameters<Provider[QueryName]>[0],
  options?: UseQueryOptions<GetListOutput<TRecord>>
) {
  return useQuery({
    queryKey: [resource.cacheKey, params],
    queryFn: () => resource.getList(params),
    ...options,
  })
}
*/
