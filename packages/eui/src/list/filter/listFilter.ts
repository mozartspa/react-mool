import { andFilters, FilterOperators } from "@react-mool/core"
import get from "dlv"
import {
  FilterBaseProps,
  FilterComponent,
  FilterWhereContext,
  getFilterToWhere,
} from "./Filter"

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

/** The condition of a filter without `toWhere`: `{ a: { b: value } }` for `name="a.b"`. */
function implicitWhere(name: string, value: unknown): any {
  return name.split(".").reduceRight<unknown>((where, key) => ({ [key]: where }), value)
}

/**
 * `toWhere` of the filter element. `emptyOption` is handled by the `resolveToWhere`
 * of the select filters: a component without it (eg. a wrapper that does not
 * forward it) would pass the "(empty)" option to the `toWhere` prop.
 * It is called for every filter, also without a value, so that a misconfigured
 * `emptyOption` throws on mount, not when the user selects it.
 */
function resolveToWhere(
  filter: React.ReactElement<FilterBaseProps>,
  operators: FilterOperators | undefined
) {
  const { name, emptyOption } = filter.props as FilterBaseProps & {
    emptyOption?: unknown
  }
  if (emptyOption != null) {
    if (!(filter.type as FilterComponent).resolveToWhere) {
      throw new Error(
        `Filter "${name}": its component does not support "emptyOption". A component wrapping a select filter must forward its "resolveToWhere".`
      )
    }
    if (!operators) {
      throw new Error(
        `Filter "${name}": "emptyOption" requires the data provider to implement "getFilterOperators".`
      )
    }
  }
  return getFilterToWhere(filter)
}

export type TransformWhereContext<TFilter = any> = FilterWhereContext<TFilter>

/** Changes the list filter of a filter bar, eg. to add conditions that no filter gives. */
export type TransformWhere<TFilter = any> = (
  where: TFilter,
  context: TransformWhereContext<TFilter>
) => TFilter

export type BuildListFilterParams<TFilter = any> = {
  /** Values of the filter form */
  values: any
  /** Filter elements, in the order they are declared */
  filters: React.ReactElement<FilterBaseProps>[]
  transformWhere?: TransformWhere<TFilter>
  /** Operators of the data provider. Required by the filters with `toWhere` or `emptyOption`. */
  operators?: FilterOperators<TFilter>
}

/**
 * The list filter of a filter bar: the `and` of the conditions of the filters with a value.
 *
 * - The condition of a filter is given by its `toWhere`, otherwise by its `name`:
 *   `name="code.contains"` gives `{ code: { contains: value } }`.
 * - Values without a filter (eg. from `initialValues`, or restored) are ignored.
 * - Conditions that match every record are skipped: `{}` if none is left, the condition
 *   itself if only one is left.
 * - A `toWhere` returning `undefined` or `null` gives no condition.
 * - Without operators (the data provider has no `getFilterOperators` for the resource)
 *   the conditions are merged deeply, and it throws when two of them set the same key
 *   to different values (`strictMergeFilters`). `emptyOption` requires operators.
 *
 * The result goes through `transformWhere`, if set. The list combines it with its
 * `baseFilter` (with the default `mergeFilters`, in `and`).
 */
export function buildListFilter<TFilter = any>(
  params: BuildListFilterParams<TFilter>
): TFilter {
  const { values, filters, transformWhere, operators } = params

  const namedFilters = filters.filter((filter) => filter.props.name != null)

  const conditions = namedFilters.map((filter): TFilter | undefined | null => {
    const { name } = filter.props
    const toWhere = resolveToWhere(filter, operators)
    const value = get(values ?? {}, name)
    if (isEmptyFilterValue(value)) {
      return undefined
    }
    return toWhere ? toWhere(value, { values, operators }) : implicitWhere(name, value)
  })

  // Without conditions it is `{}`, as the filter bar has always given: custom
  // `mergeFilters` of the lists may not expect `undefined` (eg. `{ AND: filters }`).
  const where = andFilters(operators, conditions) ?? ({} as TFilter)

  return transformWhere ? transformWhere(where, { values, operators }) : where
}
