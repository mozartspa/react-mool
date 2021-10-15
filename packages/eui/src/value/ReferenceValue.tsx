import { Reference, ReferenceProps } from "../utilities/Reference"
import { Value, ValueProps } from "./Value"

export type ReferenceValueProps<TRecord = any> = ValueProps &
  Omit<ReferenceProps<TRecord>, "id">

export const ReferenceValue = <TRecord extends any>(
  props: ReferenceValueProps<TRecord>
) => {
  return (
    <Value {...props}>
      {({ value }) => {
        return <Reference {...props} id={value} />
      }}
    </Value>
  )
}
