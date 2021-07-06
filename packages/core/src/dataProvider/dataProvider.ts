import React, { useMemo } from "react"
import { useResource } from "../resource"

export type RecordID = string | number

export type SortOrder = "asc" | "desc"

export interface GetOneParams {
  id: RecordID
}

export interface GetListParams<TFilter = any> {
  page: number
  pageSize: number
  sortField: string
  sortOrder: SortOrder
  filter?: TFilter
}

export interface GetListOutput<TRecord = any> {
  items: TRecord[]
  total: number
}

export interface UpdateParams<TUpdate = any> {
  id: RecordID
  data: TUpdate
}

export interface DeleteParams {
  id: RecordID
}

export interface ResourceDataProvider<
  TRecord = any,
  TCreate = any,
  TUpdate = any,
  TFilter = any
> {
  id: (record: TRecord) => RecordID
  getOne: (params: GetOneParams) => Promise<TRecord>
  getList: (params: GetListParams<TFilter>) => Promise<GetListOutput<TRecord>>
  create: (params: TCreate) => Promise<TRecord>
  update: (params: UpdateParams<TUpdate>) => Promise<TRecord>
  delete: (params: DeleteParams) => Promise<TRecord | undefined>
}

export interface DataProvider<
  TRecord = any,
  TCreate = any,
  TUpdate = any,
  TFilter = any
> {
  id: (resource: string, record: TRecord) => RecordID
  getOne: (resource: string, params: GetOneParams) => Promise<TRecord>
  getList: (
    resource: string,
    params: GetListParams<TFilter>
  ) => Promise<GetListOutput<TRecord>>
  create: (resource: string, params: TCreate) => Promise<TRecord>
  update: (resource: string, params: UpdateParams<TUpdate>) => Promise<TRecord>
  delete: (resource: string, params: DeleteParams) => Promise<TRecord | undefined>
}

export const DataProviderContext = React.createContext<DataProvider | undefined>(
  undefined
)

export function useDataProvider<
  TRecord = any,
  TCreate = any,
  TUpdate = any,
  TFilter = any
>(): DataProvider<TRecord, TCreate, TUpdate, TFilter> {
  const context = React.useContext(DataProviderContext)

  if (!context) {
    throw new Error(`DataProviderContext not found.`)
  }

  return context
}

function createResourceDataProvider(
  dataProvider: DataProvider,
  resource: string
): ResourceDataProvider {
  return {
    id: (...args) => dataProvider.id(resource, ...args),
    getOne: (...args) => dataProvider.getOne(resource, ...args),
    getList: (...args) => dataProvider.getList(resource, ...args),
    create: (...args) => dataProvider.create(resource, ...args),
    update: (...args) => dataProvider.update(resource, ...args),
    delete: (...args) => dataProvider.delete(resource, ...args),
  }
}

export function useResourceDataProvider<
  TRecord = any,
  TCreate = any,
  TUpdate = any,
  TFilter = any
>(resource?: string): ResourceDataProvider<TRecord, TCreate, TUpdate, TFilter> {
  const res = useResource(resource)
  const dataProvider = useDataProvider()
  const resourceDataProvider = useMemo(
    () => createResourceDataProvider(dataProvider, res),
    [dataProvider, res]
  )

  return resourceDataProvider
}
