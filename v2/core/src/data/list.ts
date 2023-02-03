export type SortOrder = "asc" | "desc"

export interface GetListParams<TFilter = any> {
  page: number
  pageSize: number
  sortField?: string
  sortOrder?: SortOrder
  filter?: TFilter
}

export interface GetListOutput<TRecord = any> {
  items: TRecord[]
  total: number
}

export type GetListQueryFn<TRecord = any, TFilter = any> = (
  params: GetListParams<TFilter>
) => Promise<GetListOutput<TRecord>>
