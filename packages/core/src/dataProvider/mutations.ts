import { useMutation, UseMutationOptions, useQueryClient } from "react-query"
import { useResource } from "../resource"
import { DeleteParams, UpdateParams, useResourceDataProvider } from "./dataProvider"

export type UseCreateOptions<TRecord = any, TCreate = any> = UseMutationOptions<
  TRecord,
  unknown,
  TCreate
> & {
  resource?: string
}

export type UseUpdateOptions<TRecord = any, TUpdate = any> = UseMutationOptions<
  TRecord,
  unknown,
  UpdateParams<TUpdate>
> & {
  resource?: string
}

export type UseDeleteOptions<TRecord> = UseMutationOptions<
  TRecord | undefined,
  unknown,
  DeleteParams
> & {
  resource?: string
}

export function useCreate<TRecord = any, TCreate = any>(
  options: UseCreateOptions<TRecord, TCreate> = {}
) {
  const resource = useResource(options.resource)
  const dataProvider = useResourceDataProvider<TRecord>(resource)
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async (data) => {
      return dataProvider.create(data)
    },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        // update cache
        const id = dataProvider.id(data)
        queryClient.setQueryData([resource, String(id)], data)
        // call user onSuccess
        return options.onSuccess?.(data, variables, context)
      },
    }
  )

  return mutation
}

export function useUpdate<TRecord = any, TUpdate = any>(
  options: UseUpdateOptions<TRecord, TUpdate> = {}
) {
  const resource = useResource(options.resource)
  const dataProvider = useResourceDataProvider<TRecord>(resource)
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async (data) => {
      return dataProvider.update(data)
    },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        // update cache
        const id = dataProvider.id(data)
        queryClient.setQueryData([resource, String(id)], data)
        // call user onSuccess
        return options.onSuccess?.(data, variables, context)
      },
    }
  )

  return mutation
}

export function useDelete<TRecord = any>(options: UseDeleteOptions<TRecord> = {}) {
  const resource = useResource(options.resource)
  const dataProvider = useResourceDataProvider<TRecord>(resource)

  // TS seems not understanding that data could be undefined.
  const opts = options as UseMutationOptions<TRecord | undefined, unknown, DeleteParams>

  const mutation = useMutation(async (data) => {
    return dataProvider.delete(data)
  }, opts)

  return mutation
}
