import { ReactNode } from "react"
import { UseQueryResult } from "react-query"
import { RecordID } from "./dataProvider"
import { useGetMany, UseGetManyOptions } from "./queries"

export type GetManyProps<TRecord = any> = UseGetManyOptions<TRecord> & {
  ids: RecordID[]
  children: (
    records: (TRecord | undefined)[],
    meta: UseQueryResult<(TRecord | undefined)[], unknown>
  ) => ReactNode
}

export const GetMany = <TRecord extends any>(props: GetManyProps<TRecord>) => {
  const { ids, children, ...options } = props
  const query = useGetMany(ids, options)

  const records = query.data || []

  return <>{children(records, query)}</>
}
