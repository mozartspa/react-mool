import { useCallback } from "react"
import { useResourceDefinition } from "./definitions"
import { useResource } from "./resource"

function isValidString(value: any) {
  return value != null && typeof value === "string" && value !== ""
}

function defaultRecordName(record: any) {
  if (record == null) {
    return ""
  }

  // Try to guess the right field to use.
  for (const key of ["name", "title"]) {
    if (isValidString(record[key])) {
      return record[key]
    }
  }

  // Find the first field that is a string
  for (const key in record) {
    if (isValidString(record[key])) {
      return record[key]
    }
  }

  // No name found
  return ""
}

export function useGetRecordName<TRecord = any>(resource?: string) {
  const res = useResource(resource)
  const { recordName = defaultRecordName } = useResourceDefinition(res)

  return useCallback(
    (record: TRecord) => {
      return recordName(record)
    },
    [recordName]
  )
}
