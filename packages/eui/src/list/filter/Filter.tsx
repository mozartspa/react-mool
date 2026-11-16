import { EuiFlexItemProps } from "@elastic/eui"
import { Field, FieldComponentProps, FieldProps } from "@mozartspa/mobx-form"
import { FilterOperators } from "@react-mool/core"

export type FilterWhereContext<TFilter = any> = {
  /** Values of all the filters, to read only */
  values: any
  /** Operators of the data provider, to combine filters */
  operators: FilterOperators<TFilter>
}

/** Turns the value of a filter into a list filter. */
export type ToWhere<TFilter = any> = (
  value: any,
  context: FilterWhereContext<TFilter>
) => TFilter

export type FilterBaseProps = {
  /**
   * Path of the filter value in the filter values.
   * Without `toWhere`, also the path of the value in the list filter:
   * `name="code.contains"` gives `{ code: { contains: value } }`.
   */
  name: string
  label?: string
  alwaysOn?: boolean
  grow?: EuiFlexItemProps["grow"]
  /**
   * Turns the value of the filter into a list filter. Called only when the filter
   * has a value, with the value as stored in the filter values (ie. after `parse`).
   * Requires the data provider to implement `getFilterOperators`.
   */
  toWhere?: ToWhere
}

/**
 * A filter component. `resolveToWhere` gives the `toWhere` of an element
 * of the component, when it is not just its `toWhere` prop.
 * Components wrapping a filter must forward it.
 */
export type FilterComponent<P extends FilterBaseProps = FilterBaseProps> = React.FC<P> & {
  resolveToWhere?: (props: P) => ToWhere | undefined
}

/** The `toWhere` of a filter element, if any. */
export function getFilterToWhere(
  element: React.ReactElement<FilterBaseProps>
): ToWhere | undefined {
  const { resolveToWhere } = element.type as FilterComponent
  return resolveToWhere ? resolveToWhere(element.props) : element.props.toWhere
}

export type FilterComponentProps = FilterBaseProps & FieldComponentProps

export type FilterProps = FilterComponentProps & Pick<FieldProps, "children">

export const Filter = (props: FilterProps) => {
  const { alwaysOn, grow, toWhere, ...fieldProps } = props

  return <Field {...fieldProps} />
}
