import { formatText } from "@elastic/eui"
import { ColumnProps } from "./Column"

export type TextColumnProps = ColumnProps

export const TextColumn = (props: TextColumnProps) => {
  const { value } = props

  return formatText(value)
}
