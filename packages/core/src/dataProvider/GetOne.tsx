import { ReactNode } from "react"
import { UseQueryResult } from "react-query"
import { RecordID } from "./dataProvider"
import { useGetOne } from "./queries"

export type GetOneProps<TRecord = any> = {
  id: RecordID
  resource?: string
  children: (
    record: TRecord | undefined,
    meta: UseQueryResult<TRecord, unknown>
  ) => ReactNode
  loadingView?: ReactNode
  errorView?: ReactNode
}

export const GetOne = <TRecord extends any>(props: GetOneProps<TRecord>) => {
  const { id, resource, children, loadingView, errorView } = props
  const query = useGetOne(id, { resource })

  const record = query.data

  if (loadingView && query.isLoading) {
    return <>{loadingView}</>
  }

  if (errorView && query.isError) {
    return <>{errorView}</>
  }

  return <>{children(record, query)}</>
}
