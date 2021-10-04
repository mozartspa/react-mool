import { SelectProps } from "../../select"
import { ColumnProps } from "./Column"

export type SelectColumnProps = ColumnProps & Pick<SelectProps, "options" | "multiple">

export const SelectColumn = (props: SelectColumnProps) => {
  const { value, options, multiple } = props

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

  return multiple ? renderMultiple(value) : renderSingle(value)
}
