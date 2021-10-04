import { SelectProps } from "../select"
import { Value, ValueProps } from "./Value"

export type SelectValueProps = ValueProps & Pick<SelectProps, "options" | "multiple">

export const SelectValue = (props: SelectValueProps) => {
  const { options, multiple } = props

  const renderMultiple = (value: any) => {
    const opts = Array.isArray(value)
      ? value.map((val) => options.find((o) => o.value === val)).filter(Boolean)
      : []
    if (opts.length === 0) {
      return null
    } else {
      return <>{opts.map((o) => o?.label).join(", ")}</>
    }
  }

  const renderSingle = (value: any) => {
    const opt = options.find((o) => o.value === value)
    if (!opt) {
      return null
    } else {
      return <>{opt.inputDisplay || opt.label}</>
    }
  }

  return (
    <Value {...props}>
      {({ value }) => {
        return multiple ? renderMultiple(value) : renderSingle(value)
      }}
    </Value>
  )
}
