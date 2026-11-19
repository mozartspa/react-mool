import { EuiIcon } from "@elastic/eui"
import { isNoFilter, orFilters, useTranslate } from "@react-mool/core"
import { useMemo } from "react"
import { t } from "../../i18n"
import { SelectOption } from "../../select"
import { FilterBaseProps, ToWhere } from "./Filter"
import { isEmptyFilterValue } from "./listFilter"

/** Value of the "(empty)" option in the filter values. It never reaches the `toWhere` prop. */
export const EMPTY_OPTION_VALUE = "$$$__EMPTY_OPTION__$$$"

export type EmptyOption<TFilter = any> = {
  /** Filter matching the records with no value, eg. `{ supplierId: { equals: null } }` */
  where: TFilter
  /** Label of the option. Defaults to the translated "(empty)". */
  label?: string
}

export type EmptyOptionProps = {
  /**
   * Adds an "(empty)" option, matching the records with no value. Requires `toWhere`,
   * and filter operators from the data provider (it is an `or`).
   */
  emptyOption?: EmptyOption
}

/** `options` followed by the "(empty)" option, if `emptyOption` is set. */
export function useOptionsWithEmptyOption<T>(
  options: SelectOption<T>[],
  emptyOption: EmptyOption | undefined
): SelectOption<T>[]
export function useOptionsWithEmptyOption<T>(
  options: SelectOption<T>[] | undefined,
  emptyOption: EmptyOption | undefined
): SelectOption<T>[] | undefined
export function useOptionsWithEmptyOption<T>(
  options: SelectOption<T>[] | undefined,
  emptyOption: EmptyOption | undefined
) {
  const translate = useTranslate()
  const label = emptyOption?.label ?? translate(t.eui.filter.empty_option)
  const enabled = emptyOption != null

  return useMemo(() => {
    if (!enabled) {
      return options
    }
    const option = {
      value: EMPTY_OPTION_VALUE,
      label,
      append: <EuiIcon type="tokenNull" />,
    } as SelectOption<any>
    return [...(options ?? []), option]
  }, [options, enabled, label])
}

/**
 * `toWhere` handling the "(empty)" option: with it selected, the filter is
 * `emptyOption.where`, or-ed with `toWhere` of the other selected options, if any
 * and if it gives a condition.
 */
export function withEmptyOption(toWhere: ToWhere, emptyOption: EmptyOption): ToWhere {
  return (value, context) => {
    const hasEmpty = Array.isArray(value)
      ? value.includes(EMPTY_OPTION_VALUE)
      : value === EMPTY_OPTION_VALUE
    if (!hasEmpty) {
      return toWhere(value, context)
    }

    const others = Array.isArray(value)
      ? value.filter((item) => item !== EMPTY_OPTION_VALUE)
      : undefined
    if (isEmptyFilterValue(others)) {
      return emptyOption.where
    }
    // No condition from the other options (eg. they are handled by `transformWhere`):
    // they add nothing to the `or`, which would otherwise match every record.
    const othersWhere = toWhere(others, context)
    if (isNoFilter(othersWhere)) {
      return emptyOption.where
    }
    return orFilters(context.operators, [emptyOption.where, othersWhere])
  }
}

/** `resolveToWhere` of the select filters. */
export function resolveSelectToWhere(
  props: FilterBaseProps & EmptyOptionProps
): ToWhere | undefined {
  const { name, toWhere, emptyOption } = props
  if (!emptyOption) {
    return toWhere
  }
  if (!toWhere) {
    throw new Error(`Filter "${name}": "emptyOption" requires "toWhere".`)
  }
  // It would match every record: selecting "(empty)" would show them all.
  if (isNoFilter(emptyOption.where)) {
    throw new Error(`Filter "${name}": "emptyOption.where" has no conditions.`)
  }
  return withEmptyOption(toWhere, emptyOption)
}
