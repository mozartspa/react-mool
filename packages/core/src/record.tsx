import get from "dlv"
import React, { ReactNode, useMemo } from "react"
import { RecordID } from "./dataProvider"

export type RecordContextValue<TRecord = any> = {
  record: TRecord | undefined
  id: RecordID
}

export const RecordContext = React.createContext<RecordContextValue | undefined>(
  undefined
)

export function useRecordContext<TRecord = any>() {
  const context = React.useContext<RecordContextValue<TRecord> | undefined>(RecordContext)
  if (!context) {
    throw new Error(`RecordContext not found.`)
  }
  return context
}

export function useRecord<TRecord = any>(): TRecord | undefined {
  const context = useRecordContext<TRecord>()
  return context.record
}

export function useRecordId() {
  return useRecordContext().id
}

export function useRecordValue<TValue = any>(name: string) {
  const record = useRecord()
  const value = get(record, name)
  return value as TValue
}

export type RecordContextProviderProps<TRecord = any> = {
  record: TRecord | undefined
  id: RecordID
  children?: ReactNode
}

export function RecordContextProvider(props: RecordContextProviderProps) {
  const { record, id, children } = props

  const value = useMemo(() => ({ record, id }), [record, id])

  return <RecordContext.Provider value={value} children={children} />
}
