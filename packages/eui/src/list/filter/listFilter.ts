import { FilterOperators, isNoFilter } from "@react-mool/core"
import get from "dlv"
import { FilterBaseProps, FilterComponent, getFilterToWhere, ToWhere } from "./Filter"

/** A filter value set by the user: not `null`, `""`, `[]` or an object of empty values. */
export function isEmptyFilterValue(value: unknown): boolean {
  if (value == null || value === "") {
    return true
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.values(value).every(isEmptyFilterValue)
  }
  return false
}

function isPlainObject(value: unknown): value is Record<string, any> {
  return value != null && typeof value === "object" && !Array.isArray(value)
}

/** Removes the value at `path`, and the objects left empty by the removal. */
function unsetPath(values: any, path: string[]): any {
  if (!isPlainObject(values)) {
    return values
  }
  const [key, ...rest] = path
  if (!(key in values)) {
    return values
  }
  const { [key]: child, ...others } = values
  if (rest.length === 0) {
    return others
  }
  const next = unsetPath(child, rest)
  return isPlainObject(next) && Object.keys(next).length === 0
    ? others
    : { ...others, [key]: next }
}

/**
 * `toWhere` of the filter element. `emptyOption` is handled by the `resolveToWhere`
 * of the select filters: a component without it (eg. a wrapper that does not
 * forward it) would pass the "(empty)" option to the `toWhere` prop.
 */
function resolveToWhere(filter: React.ReactElement<FilterBaseProps>) {
  const { name, emptyOption } = filter.props as FilterBaseProps & { emptyOption?: unknown }
  if (emptyOption != null && !(filter.type as FilterComponent).resolveToWhere) {
    throw new Error(
      `Filter "${name}": its component does not support "emptyOption". A component wrapping a select filter must forward its "resolveToWhere".`
    )
  }
  return getFilterToWhere(filter)
}

export type BuildListFilterParams<TFilter = any> = {
  /** Values of the filter form */
  values: any
  /** Filter elements, in the order they are declared */
  filters: React.ReactElement<FilterBaseProps>[]
  transformValues?: (values: any) => TFilter
  /** Required when some filter has `toWhere` */
  operators?: FilterOperators<TFilter>
}

/**
 * The list filter of a filter bar:
 *
 *     and([transformValues(values of the filters without toWhere), ...toWhere of each filter])
 *
 * The result is always an `and`, `{}` if no filter has conditions.
 *
 * `toWhere` is called only for the filters with a value.
 * Without `toWhere` filters, the result is `transformValues(values)`, as it has always been.
 */
export function buildListFilter<TFilter = any>(
  params: BuildListFilterParams<TFilter>
): TFilter {
  const { values, filters, transformValues, operators } = params

  const whereFilters: Array<{ name: string; toWhere: ToWhere }> = []
  filters.forEach((filter) => {
    const toWhere = filter.props.name != null ? resolveToWhere(filter) : undefined
    if (toWhere) {
      whereFilters.push({ name: filter.props.name, toWhere })
    }
  })
  if (whereFilters.length === 0) {
    return transformValues ? transformValues(values) : values
  }

  if (!operators) {
    const names = whereFilters.map((filter) => filter.name).join(", ")
    throw new Error(
      `Filters with "toWhere" require the data provider to implement "getFilterOperators" (filters: ${names}).`
    )
  }

  let otherValues = values
  const parts = whereFilters.map(({ name, toWhere }) => {
    otherValues = unsetPath(otherValues, name.split("."))
    const value = get(values ?? {}, name)
    return isEmptyFilterValue(value) ? undefined : toWhere(value, { values, operators })
  })

  const base = transformValues ? transformValues(otherValues) : otherValues
  const conditions = [base, ...parts].filter((part) => !isNoFilter(part))
  // Always `and`, even with one condition: the list deep-merges the result with
  // its `baseFilter` (default `mergeFilters`), and would mix their keys.
  // Without conditions it is `{}`, as the filter bar has always given: custom
  // `mergeFilters` of the lists may not expect `undefined` (eg. `{ AND: filters }`).
  return conditions.length > 0 ? operators.and(conditions) : ({} as TFilter)
}
