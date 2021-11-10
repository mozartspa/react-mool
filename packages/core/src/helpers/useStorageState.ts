/**
 * Inspired by https://github.com/imbhargav5/rooks/blob/main/src/hooks/useSessionstorageState.ts
 */
import { useCallback, useEffect, useRef, useState } from "react"

function getValueFromStorage(key: string, storage: Storage) {
  if (typeof storage === "undefined") {
    return undefined
  }

  const storedValue = storage.getItem(key)

  if (storedValue == null) {
    return undefined
  }

  try {
    return JSON.parse(storedValue)
  } catch (error) {
    console.error(error)
  }

  return storedValue
}

function saveValueToStorage(key: string, value: any, storage: Storage) {
  if (typeof storage === "undefined") {
    return
  }
  if (value === undefined) {
    storage.removeItem(key)
  } else {
    storage.setItem(key, JSON.stringify(value))
  }
}

function initialize(key: string, initialState: any, storage: Storage) {
  const valueLoadedFromStorage = getValueFromStorage(key, storage)
  if (valueLoadedFromStorage == null) {
    return initialState
  } else {
    return valueLoadedFromStorage
  }
}

export type UseStorageStateOptions = {
  storage?: Storage
}

export type UseStorageStateResult<S = any> = [S, (value: S) => void, () => void]

export function useStorageState<S>(
  key: string,
  initialState?: S | (() => S),
  options: UseStorageStateOptions = {}
): UseStorageStateResult<S> {
  const { storage = sessionStorage } = options

  const [value, __setValue] = useState(() => initialize(key, initialState, storage))
  const isUpdateFromListener = useRef(false)

  useEffect(() => {
    /**
     * We need to ensure there is no loop of
     * storage events fired. Hence we are using a ref
     * to keep track of whether setValue is from another
     * storage event
     */
    if (!isUpdateFromListener.current) {
      saveValueToStorage(key, value, storage)
    }
  }, [value])

  // check for changes across windows
  useEffect(() => {
    const listen = (e: StorageEvent) => {
      if (e.storageArea === storage && e.key === key) {
        try {
          isUpdateFromListener.current = true
          const newValue = JSON.parse(e.newValue || "null")
          if (value !== newValue) {
            __setValue(newValue)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    window.addEventListener("storage", listen)

    return () => {
      window.removeEventListener("storage", listen)
    }
  }, [storage, key])

  const setValue = useCallback((newValue: S) => {
    isUpdateFromListener.current = false
    __setValue(newValue)
  }, [])

  const remove = useCallback(() => {
    storage.removeItem(key)
  }, [storage, key])

  return [value, setValue, remove]
}
