import { Reference, ReferenceProps } from "../../utilities"
import { ColumnProps } from "./Column"

export type ReferenceColumnProps<TRecord = any> = ColumnProps &
  Omit<ReferenceProps<TRecord>, "id">

export const ReferenceColumn = <TRecord extends any>(
  props: ReferenceColumnProps<TRecord>
) => {
  const { value, ...rest } = props

  return <Reference {...rest} id={value} />
}
