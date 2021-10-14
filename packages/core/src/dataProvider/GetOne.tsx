import { ReactNode } from "react"
import { UseQueryResult } from "react-query"
import { RecordID } from "./dataProvider"
import { useGetOne, UseGetOneOptions } from "./queries"

export type GetOneProps<TRecord = any> = UseGetOneOptions<TRecord> & {
  id: RecordID
  children: (
    record: TRecord | undefined,
    meta: UseQueryResult<TRecord, unknown>
  ) => ReactNode
}

export const GetOne = <TRecord extends any>(props: GetOneProps<TRecord>) => {
  const { id, children, ...options } = props
  const query = useGetOne(id, options)

  const record = query.data

  return <>{children(record, query)}</>
}
