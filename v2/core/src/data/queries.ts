import { GetListQueryResolver } from "./list"

export type QueryResolver<I = any, O = any> = (args: I) => Promise<O>

export type Query<I = any, O = any> = {
  (args: I): Promise<O>
  cacheKey: string[]
}

export type QueryFromResolver<T extends QueryResolver> = T & { cacheKey: string[] }

type Func = (...args: any[]) => any

function cloneFunc<T extends Func>(func: T): T {
  return ((...args: any[]) => func(...args)) as T
}

export function createQuery<I = any, O = any>(
  cacheKey: string | string[],
  resolver: QueryResolver<I, O>
): Query<I, O> {
  const fnWithKey = cloneFunc(resolver) as Query<I, O>
  fnWithKey.cacheKey = Array.isArray(cacheKey) ? cacheKey : [cacheKey]
  return fnWithKey
}

export type QueriesConfig<TRecord = any, TFilter = any> = {
  cacheKey: string
  queries: {
    getList?: GetListQueryResolver<TRecord, TFilter>
    [name: string]: QueryResolver | undefined
  }
}
export type Queries<T extends QueriesConfig> = {
  [P in keyof T["queries"]]: T["queries"][P] extends QueryResolver
    ? QueryFromResolver<T["queries"][P]>
    : never
}

export function createQueries<Config extends QueriesConfig>(
  config: Config
): Queries<Config> {
  const queries = Object.keys(config.queries).reduce((q, key) => {
    const fn = config.queries[key]
    if (fn) {
      q[key as any] = createQuery([config.cacheKey, key], fn)
    }
    return q
  }, {} as any)

  return queries
}
