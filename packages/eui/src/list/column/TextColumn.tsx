import { formatText } from "@elastic/eui"
import { ColumnComponentProps } from "./Column"

export type TextColumnProps = ColumnComponentProps

export const TextColumn = (props: TextColumnProps) => {
  const { value } = props

  return formatText(value)
}
