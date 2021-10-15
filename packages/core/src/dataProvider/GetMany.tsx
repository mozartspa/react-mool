import { ReactNode } from "react"
import { UseQueryResult } from "react-query"
import { RecordID } from "./dataProvider"
import { useGetMany } from "./queries"

export type GetManyProps<TRecord = any> = {
  ids: RecordID[]
  resource?: string
  children: (
    records: (TRecord | undefined)[],
    meta: UseQueryResult<(TRecord | undefined)[], unknown>
  ) => ReactNode
  loadingView?: ReactNode
  errorView?: ReactNode
}

export const GetMany = <TRecord extends any>(props: GetManyProps<TRecord>) => {
  const { ids, resource, children, loadingView, errorView } = props
  const query = useGetMany(ids, { resource })

  const records = query.data || []

  if (loadingView && query.isLoading) {
    return <>{loadingView}</>
  }

  if (errorView && query.isError) {
    return <>{errorView}</>
  }

  return <>{children(records, query)}</>
}
