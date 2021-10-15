import { ReferenceMany, ReferenceManyProps } from "../../utilities"
import { ColumnProps } from "./Column"

export type ReferenceManyColumnProps<TRecord = any> = ColumnProps &
  Omit<ReferenceManyProps<TRecord>, "ids">

export const ReferenceManyColumn = <TRecord extends any>(
  props: ReferenceManyColumnProps<TRecord>
) => {
  const { value, ...rest } = props

  return <ReferenceMany {...rest} ids={value} />
}
