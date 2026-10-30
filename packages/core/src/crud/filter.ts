import debouncer from "lodash.debounce"
import { useCallback, useMemo, useRef, useState } from "react"
import isEqual from "react-fast-compare"
import { useIsomorphicEffect, useUpdateEffect } from "rooks"
import { useImmediateRef } from "../helpers/useImmediateRef"
import { useListContext } from "./list"

type StackEntry<TFilter> = {
  filter: TFilter
  /** Whether the filter has been set by the user (eg. a search in a filter bar) */
  isActive?: boolean
  /** Reset the filter to its empty state */
  reset?: () => void
}

export type FilterStackUpdateOptions = {
  isActive?: boolean
}

export type UseFilterStackAddResult<TFilter = any> = {
  get: () => TFilter | undefined
  update: (filter: TFilter | undefined, options?: FilterStackUpdateOptions) => void
  remove: () => void
}

export type FilterStackAddOptions = {
  reset?: () => void
}

export type UseFilterStackAdd<TFilter = any> = (
  filter?: TFilter | undefined,
  options?: FilterStackAddOptions
) => UseFilterStackAddResult<TFilter>

export function useFilterStack<TFilter = any>() {
  const [stack, setStack] = useState([] as StackEntry<TFilter | undefined>[])

  const stackRef = useImmediateRef(stack)

  const add: UseFilterStackAdd<TFilter> = useCallback(
    (filter?: TFilter | undefined, options: FilterStackAddOptions = {}) => {
      const { reset } = options

      let entry: StackEntry<TFilter | undefined> = { filter, reset }

      setStack((stack) => [...stack, entry])

      const remove = () => {
        setStack((stack) => stack.filter((el) => el !== entry))
      }

      const update = (
        filter: TFilter | undefined,
        options: FilterStackUpdateOptions = {}
      ) => {
        const oldEntry = entry
        entry = { filter, isActive: options.isActive, reset }

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
    },
    []
  )

  const entries = useMemo(() => stack.map((entry) => entry?.filter), [stack])

  const hasActiveFilters = stack.some((entry) => entry.isActive)

  const resetFilters = useCallback(() => {
    stackRef.current.forEach((entry) => entry.reset?.())
  }, [])

  return {
    add,
    entries,
    hasActiveFilters,
    resetFilters,
  }
}

export type UseAddFilterOptions<TFilter = any> = {
  debounce?: boolean | number
  onChange?: (values: TFilter) => void
  /** Reset the filter, called by the list `resetFilters` */
  reset?: () => void
}

export type SetFilter<TFilter = any> = ((
  filter: TFilter,
  options?: FilterStackUpdateOptions
) => void) & {
  /** Apply immediately the pending filter, without waiting for the debounce */
  flush: () => void
}

export function useAddFilter<TFilter = any>(
  initialFilter: TFilter | (() => TFilter),
  options: UseAddFilterOptions<TFilter> = {}
) {
  const { debounce = false, onChange, reset } = options

  const list = useListContext<any, TFilter>()

  const operations = useRef<UseFilterStackAddResult<TFilter> | undefined>(undefined)

  // onChange/reset func refs
  const onChangeRef = useImmediateRef(onChange)
  const resetRef = useImmediateRef(reset)

  // Add/remove filter to stack on mount/unmount
  useIsomorphicEffect(() => {
    operations.current = list.addFilter(
      initialFilter instanceof Function ? initialFilter() : initialFilter,
      { reset: () => resetRef.current?.() }
    )

    return () => {
      operations.current?.remove()
      operations.current = undefined
    }
  }, [])

  // Updater func, eventully debounced
  const updater = useMemo(() => {
    const exec = (filter: TFilter, options?: FilterStackUpdateOptions) => {
      // Notify if filter changed
      const prev = operations.current?.get()
      const isInitial = prev === undefined && isEqual(filter, {})
      const isChanged = !isInitial && !isEqual(prev, filter)
      if (isChanged) {
        onChangeRef.current?.(filter)
      }

      // Update filter
      operations.current?.update(filter, options)
    }

    if (debounce === false) {
      return exec
    } else {
      const wait = debounce === true ? 300 : debounce
      return debouncer(exec, wait)
    }
  }, [debounce])

  // Updater func ref
  const updaterRef = useImmediateRef<typeof updater & { flush?: () => void }>(updater)

  // Updater func stable
  const setFilter: SetFilter<TFilter> = useMemo(
    () =>
      Object.assign(
        (filter: TFilter, options?: FilterStackUpdateOptions) =>
          updaterRef.current(filter, options),
        { flush: () => updaterRef.current.flush?.() }
      ),
    []
  )

  return setFilter
}

export type UseAddFilterStateResult<TFilter = any> = [TFilter, (filter: TFilter) => void]

export function useAddFilterState<TFilter = any>(
  initialFilter: TFilter,
  options?: UseAddFilterOptions
): UseAddFilterStateResult<TFilter> {
  const update = useAddFilter(initialFilter, options)

  const [filter, setFilter] = useState(initialFilter)

  useUpdateEffect(() => {
    update(filter)
  }, [filter, update])

  return [filter, setFilter]
}
