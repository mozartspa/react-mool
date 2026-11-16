import merge from "lodash.merge"

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
 * Filters merged deeply, for data providers without operators: on the same key the
 * last filter takes precedence, arrays are merged by index. `{}` without filters.
 */
export function deepMergeFilters<TFilter = any>(
  ...filters: Array<TFilter | undefined>
): TFilter {
  return merge({}, ...filters)
}

/**
 * Filter matching all `filters`. Filters without conditions are skipped:
 * returns `undefined` if none is left, the filter itself if only one is left.
 */
export function andFilters<TFilter>(
  operators: FilterOperators<TFilter>,
  filters: Array<TFilter | undefined>
): TFilter | undefined {
  const parts = filters.filter((filter): filter is TFilter => !isNoFilter(filter))
  if (parts.length === 0) return undefined
  if (parts.length === 1) return parts[0]
  return operators.and(parts)
}

/**
 * Filter matching at least one of `filters`. A filter without conditions
 * matches every record, and so does the result: it returns `undefined`.
 * Throws with no filters: a filter matching no record is not portable
 * (eg. Prisma ignores an empty `OR` nested in an `AND`, matching every record).
 */
export function orFilters<TFilter>(
  operators: FilterOperators<TFilter>,
  filters: Array<TFilter | undefined>
): TFilter | undefined {
  if (filters.length === 0) {
    throw new Error("orFilters requires at least one filter.")
  }
  if (filters.some(isNoFilter)) return undefined
  if (filters.length === 1) return filters[0]
  return operators.or(filters as TFilter[])
}
