import { EuiFlexItemProps } from "@elastic/eui"
import { Field, FieldComponentProps, FieldProps } from "@mozartspa/mobx-form"

export type FilterBaseProps = {
  name: string
  alwaysOn?: boolean
  grow?: EuiFlexItemProps["grow"]
}

export type FilterComponentProps = FilterBaseProps & FieldComponentProps

export type FilterProps = FilterComponentProps & Pick<FieldProps, "children">

export const Filter = (props: FilterProps) => {
  const { alwaysOn, grow, ...fieldProps } = props

  return <Field {...fieldProps} />
}
