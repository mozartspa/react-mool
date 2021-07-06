import get from "dlv"
import React from "react"

export const RecordContext = React.createContext<any>(undefined)

export function useRecord<T = any>(): T | undefined {
  const context = React.useContext(RecordContext)
  return context as T
}

export function useRecordValue<TValue = any>(name: string) {
  const record = useRecord()
  const value = get(record, name)
  return value as TValue
}
