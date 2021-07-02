/*
useGetList()
useUpdate()
useCreate()
useDelete()
*/

import { useQuery, UseQueryOptions } from "react-query"
import { useResource } from "../resource"
import {
  GetListOutput,
  GetListParams,
  RecordID,
  useResourceDataProvider,
} from "./dataProvider"

export type UseGetOneOptions<TRecord = any> = UseQueryOptions<
  unknown,
  unknown,
  TRecord
> & {
  resource?: string
}

export type UseGetListOptions<TRecord = any> = UseQueryOptions<
  unknown,
  unknown,
  GetListOutput<TRecord>
> & {
  resource?: string
}

export function useGetOne<TRecord = any>(
  id: RecordID,
  options: UseGetOneOptions<TRecord> = {}
) {
  const resource = useResource(options.resource)
  const dataProvider = useResourceDataProvider<TRecord>(resource)
  const query = useQuery(
    [resource, id],
    () => {
      return dataProvider.getOne({ id })
    },
    options
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
    [resource, params],
    () => {
      return dataProvider.getList(params)
    },
    options
  )

  return query
}
