import { useCallback } from "react"
import { useDataProvider } from "../dataProvider"
import { useResource } from "./resource"

export function useGetRecordId<TRecord = any>(resource?: string) {
  const res = useResource(resource)
  const dataProvider = useDataProvider()

  return useCallback(
    (record: TRecord) => {
      return dataProvider.id(res, record)
    },
    [dataProvider]
  )
}
