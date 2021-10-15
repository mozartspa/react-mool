import { ReferenceMany, ReferenceManyProps } from "../utilities"
import { Value, ValueProps } from "./Value"

export type ReferenceManyValueProps<TRecord = any> = ValueProps &
  Omit<ReferenceManyProps<TRecord>, "ids">

export const ReferenceManyValue = <TRecord extends any>(
  props: ReferenceManyValueProps<TRecord>
) => {
  return (
    <Value {...props}>
      {({ value }) => {
        return <ReferenceMany {...props} ids={value} />
      }}
    </Value>
  )
}
