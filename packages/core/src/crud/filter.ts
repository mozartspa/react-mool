import debouncer from "lodash.debounce"
import { useCallback, useMemo, useRef, useState } from "react"
import { useIsomorphicEffect, useUpdateEffect } from "rooks"
import { useImmediateRef } from "../helpers/useImmediateRef"
import { useListContext } from "./list"

type StackEntry<TFilter> = { filter: TFilter }

export type UseFilterStackAddResult<TFilter = any> = {
  get: () => TFilter | undefined
  update: (filter: TFilter | undefined) => void
  remove: () => void
}

export type UseFilterStackAdd<TFilter = any> = (
  filter?: TFilter | undefined
) => UseFilterStackAddResult<TFilter>

export function useFilterStack<TFilter = any>() {
  const [stack, setStack] = useState([] as StackEntry<TFilter | undefined>[])

  const stackRef = useImmediateRef(stack)

  const add: UseFilterStackAdd<TFilter> = useCallback((filter?: TFilter | undefined) => {
    let entry = { filter }

    setStack((stack) => [...stack, entry])

    const remove = () => {
      setStack((stack) => stack.filter((el) => el !== entry))
    }

    const update = (filter: TFilter | undefined) => {
      const oldEntry = entry
      entry = { filter }

      setStack((stack) => {
        const index = stack.indexOf(oldEntry)
        if (index !== -1) {
          return [...stack.slice(0, index), entry, ...stack.slice(index + 1)]
        } else {
          return stack
        }
      })
    }

    const get = () => {
      const index = stackRef.current.indexOf(entry)
      if (index !== -1) {
        return stackRef.current[index].filter
      } else {
        return undefined
      }
    }

    return {
      get,
      update,
      remove,
    }
  }, [])

  const entries = useMemo(() => stack.map((entry) => entry?.filter), [stack])

  return {
    add,
    entries,
  }
}

export type UseAddFilterOptions = {
  debounce?: boolean | number
}

export type UseAddFilterResult<TFilter = any> = [TFilter, (filter: TFilter) => void]

export function useAddFilter<TFilter = any>(
  initialFilter: TFilter,
  options: UseAddFilterOptions = {}
): UseAddFilterResult<TFilter> {
  const { debounce = false } = options

  const list = useListContext<any, TFilter>()

  const [filter, setFilter] = useState(initialFilter)
  const operations = useRef<UseFilterStackAddResult<TFilter> | undefined>(undefined)

  // Add/remove filter to stack on mount/unmount
  useIsomorphicEffect(() => {
    operations.current = list.addFilter(initialFilter)

    return () => {
      operations.current?.remove()
      operations.current = undefined
    }
  }, [])

  // Updater func, eventully debounced
  const updater = useMemo(() => {
    const exec = (filter: TFilter) => operations.current?.update(filter)
    if (debounce === false) {
      return exec
    } else {
      const wait = debounce === true ? 300 : debounce
      return debouncer(exec, wait)
    }
  }, [debounce])

  // Update filter when it changes
  useUpdateEffect(() => {
    updater(filter)
  }, [filter])

  return [filter, setFilter]
}
