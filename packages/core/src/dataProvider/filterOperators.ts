import merge from "lodash.merge"
import isEqual from "react-fast-compare"

/**
 * How the backend combines list filters.
 * Provided by the data provider, since only it knows the filter syntax.
 */
export type FilterOperators<TFilter = any> = {
  /** Filter matching the records that match all `filters` (at least two). */
  and: (filters: TFilter[]) => TFilter
  /** Filter matching the records that match at least one of `filters` (at least two). */
  or: (filters: TFilter[]) => TFilter
}

/** `undefined`, `null` and `{}` are filters without conditions: they match every record. */
export function isNoFilter(filter: unknown) {
  return (
    filter == null ||
    (typeof filter === "object" &&
      !Array.isArray(filter) &&
      Object.keys(filter as object).length === 0)
  )
}

/**
 * Filters merged deeply: on the same key the last filter takes precedence, arrays are
 * merged by index. `{}` without filters. It is not the `and` of the filters when they
 * set the same key: a custom `mergeFilters` can use it, knowing that.
 */
export function deepMergeFilters<TFilter = any>(
  ...filters: Array<TFilter | undefined>
): TFilter {
  return merge({}, ...filters)
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value != null &&
    typeof value === "object" &&
    Object.getPrototypeOf(value) === Object.prototype
  )
}

function mergeStrict(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  path: string[]
) {
  for (const [key, value] of Object.entries(source)) {
    if (value === undefined) {
      continue
    }
    const current = target[key]
    if (current === undefined) {
      target[key] = isPlainObject(value) ? mergeStrict({}, value, [...path, key]) : value
    } else if (isPlainObject(current) && isPlainObject(value)) {
      target[key] = mergeStrict({ ...current }, value, [...path, key])
    } else if (!isEqual(current, value)) {
      throw new Error(
        `Filters cannot be combined: they set "${[...path, key].join(
          "."
        )}" to different values, ` +
          `and the data provider has no filter operators for the resource. ` +
          `Combine the conditions by hand (eg. in the transformWhere of the FilterBar), ` +
          `or pass a custom mergeFilters to the list.`
      )
    }
  }
  return target
}

/**
 * Filters merged deeply, for data providers without operators, where the keys of a filter
 * are in and. Throws when two filters set the same key to different values: there is no
 * way to express their `and`, and taking one of them would silently ignore the other.
 */
export function strictMergeFilters<TFilter = any>(
  ...filters: Array<TFilter | undefined>
): TFilter {
  return filters.reduce<Record<string, unknown>>(
    (merged, filter) =>
      isNoFilter(filter)
        ? merged
        : mergeStrict(merged, filter as Record<string, unknown>, []),
    {}
  ) as TFilter
}

/**
 * Filter matching all `filters`. Filters without conditions are skipped:
 * returns `undefined` if none is left, the filter itself if only one is left.
 * Without operators the filters are merged with `strictMergeFilters`.
 */
export function andFilters<TFilter>(
  operators: FilterOperators<TFilter> | undefined,
  filters: Array<TFilter | null | undefined>
): TFilter | undefined {
  const parts = filters.filter((filter): filter is TFilter => !isNoFilter(filter))
  if (parts.length === 0) {
    return undefined
  }
  if (parts.length === 1) {
    return parts[0]
  }
  return operators ? operators.and(parts) : strictMergeFilters(...parts)
}

/**
 * Filter matching at least one of `filters`. A filter without conditions
 * matches every record, and so does the result: it returns `undefined`.
 * Throws with no filters: a filter matching no record is not portable
 * (eg. Prisma ignores an empty `OR` nested in an `AND`, matching every record).
 * Without operators it throws when there is more than one filter to combine.
 */
export function orFilters<TFilter>(
  operators: FilterOperators<TFilter> | undefined,
  filters: Array<TFilter | undefined>
): TFilter | undefined {
  if (filters.length === 0) {
    throw new Error("orFilters requires at least one filter.")
  }
  if (filters.some(isNoFilter)) {
    return undefined
  }
  if (filters.length === 1) {
    return filters[0]
  }
  if (!operators) {
    throw new Error(
      "Filters cannot be combined in or: the data provider has no filter operators for the resource."
    )
  }
  return operators.or(filters as TFilter[])
}
