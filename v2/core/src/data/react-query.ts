/**
 * Some parts are taken from blitz (https://github.com/blitz-js/blitz)
 */

import {
  MutateFunction,
  useMutation as useReactQueryMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery as useReactQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { Query } from "./queries"

type Await<T> = T extends PromiseLike<infer U> ? U : T
type PromiseReturnType<T extends (...args: any) => Promise<any>> = Await<ReturnType<T>>
type FirstParam<F extends (...args: any) => Promise<any>> = Parameters<F>[0]

type QueryLazyOptions = { suspense: unknown } | { enabled: unknown }
type QueryNonLazyOptions =
  | { suspense: true; enabled?: never }
  | { suspense?: never; enabled: true }
  | { suspense: true; enabled: true }
  | { suspense?: never; enabled?: never }

// -------------------------
// useQuery
// -------------------------
type RestQueryResult<TResult, TError> = Omit<UseQueryResult<TResult, TError>, "data">

export function useQuery<
  T extends Query,
  TResult = PromiseReturnType<T>,
  TError = unknown,
  TSelectedData = TResult
>(
  queryFn: T,
  params: FirstParam<T>,
  options?: UseQueryOptions<TResult, TError, TSelectedData> & QueryNonLazyOptions
): [TSelectedData, RestQueryResult<TSelectedData, TError>]
export function useQuery<
  T extends Query,
  TResult = PromiseReturnType<T>,
  TError = unknown,
  TSelectedData = TResult
>(
  queryFn: T,
  params: FirstParam<T>,
  options: UseQueryOptions<TResult, TError, TSelectedData> & QueryLazyOptions
): [TSelectedData | undefined, RestQueryResult<TSelectedData, TError>]
export function useQuery<
  T extends Query,
  TResult = PromiseReturnType<T>,
  TError = unknown,
  TSelectedData = TResult
>(
  queryFn: T,
  params: FirstParam<T>,
  options: UseQueryOptions<TResult, TError, TSelectedData> = {}
) {
  if (typeof queryFn === "undefined") {
    throw new Error(
      "useQuery is missing the first argument - it must be a query function"
    )
  }

  const { data, ...queryRest } = useReactQuery({
    queryKey: [queryFn.cacheKey, params],
    queryFn: () => queryFn(params),
    ...options,
    suspense: options.suspense ?? true,
  })

  return [data, queryRest]
}

// -------------------------
// createQueryHook
// -------------------------
export function createQueryHook<
  T extends Query,
  TResult = PromiseReturnType<T>,
  TError = unknown,
  TSelectedData = TResult
>(
  queryFn: T
): {
  (
    params: FirstParam<T>,
    options?: UseQueryOptions<TResult, TError, TSelectedData> & QueryNonLazyOptions
  ): [TSelectedData, RestQueryResult<TSelectedData, TError>]
  (
    params: FirstParam<T>,
    options: UseQueryOptions<TResult, TError, TSelectedData> & QueryLazyOptions
  ): [TSelectedData | undefined, RestQueryResult<TSelectedData, TError>]
} {
  return (
    params: FirstParam<T>,
    options: UseQueryOptions<TResult, TError, TSelectedData> = {}
  ) => {
    // Casted to any because it seems that `options` is not liked by ts.
    return (useQuery as any)(queryFn, params, options)
  }
}

// -------------------------------------------------------------------
//                       useMutation
// -------------------------------------------------------------------

export type MutationResultPair<TData, TError, TVariables, TContext> = [
  MutateFunction<TData, TError, TVariables, TContext>,
  Omit<UseMutationResult<TData, TError>, "mutate" | "mutateAsync">
]

export type MutationFunction<TData = unknown, TVariables = unknown> = (
  variables: TVariables
) => Promise<TData>

export function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: MutationFunction<TData, TVariables>,
  config?: UseMutationOptions<TData, TError, TVariables, TContext>
): MutationResultPair<TData, TError, TVariables, TContext> {
  const { mutate, mutateAsync, ...rest } = useReactQueryMutation<
    TData,
    TError,
    TVariables,
    TContext
  >(mutationFn, config)

  return [mutateAsync, rest] as MutationResultPair<TData, TError, TVariables, TContext>
}
