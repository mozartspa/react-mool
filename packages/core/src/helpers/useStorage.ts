import { useCallback, useMemo } from "react"
import { logError } from "./console"

export type UseStorageOptions = {
  storage?: Storage
  enabled?: boolean
}

export function useStorage(key: string, options: UseStorageOptions = {}) {
  const { storage = sessionStorage, enabled = true } = options

  const load = useCallback(() => {
    if (!storage || !enabled) {
      return undefined
    }

    try {
      const raw = storage.getItem(key)
      if (raw != null) {
        return JSON.parse(raw)
      }
    } catch (err) {
      logError(`Failed loading data from storage with key: "${key}".`)
      logError(err)
      return undefined
    }
  }, [key, storage, enabled])

  const save = useCallback(
    (data: any) => {
      if (!storage || !enabled) {
        return
      }

      try {
        storage.setItem(key, JSON.stringify(data))
      } catch (err) {
        logError(`Failed saving data to storage with key: "${key}".`)
        logError(err)
      }
    },
    [key, storage]
  )

  return useMemo(() => {
    function get<T>(defaultValue?: T): T {
      return load() ?? defaultValue
    }

    function getValue<T>(fieldName: string, defaultValue: T): T {
      const data = load()
      const value = data && data[fieldName]
      return value ?? defaultValue
    }

    function set<T>(data: T) {
      save(data)
    }

    function setValue<T>(fieldName: string, value: T) {
      const data = load() ?? {}
      data[fieldName] = value
      save(data)
    }

    return {
      get,
      getValue,
      set,
      setValue,
    }
  }, [load, save])
}
