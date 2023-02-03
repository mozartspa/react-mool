import { GetListQueryFn } from "./list"

export type QueryFn<I = any, O = any> = (args: I) => Promise<O>

export type QueryFnWithKey<T extends QueryFn = QueryFn> = T & {
  cacheKey: string[]
}

type Func = (...args: any[]) => any

function cloneFunc<T extends Func>(func: T): T {
  return ((...args: any[]) => func(...args)) as T
}

export function createQuery<T extends QueryFn>(
  cacheKey: string | string[],
  fn: T
): QueryFnWithKey<T> {
  const fnWithKey = cloneFunc(fn) as QueryFnWithKey<T>
  fnWithKey.cacheKey = Array.isArray(cacheKey) ? cacheKey : [cacheKey]
  return fnWithKey
}

export type QueriesConfig<TRecord = any, TFilter = any> = {
  cacheKey: string
  queries: {
    getList?: GetListQueryFn<TRecord, TFilter>
    [name: string]: QueryFn | undefined
  }
}
export type Queries<T extends QueriesConfig> = {
  [P in keyof T["queries"]]: T["queries"][P] extends QueryFn
    ? QueryFnWithKey<T["queries"][P]>
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
