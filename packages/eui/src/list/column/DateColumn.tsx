import { useLocale } from "@react-mool/core"
import { warn } from "../../helpers/console"
import { formatDate } from "../../helpers/formatDate"
import { ColumnProps } from "./Column"

export type DateColumnProps = ColumnProps & {
  locale?: string | string[]
  formatOptions?: Intl.DateTimeFormatOptions
}

export const DateColumn = (props: DateColumnProps) => {
  const { value, locale, formatOptions } = props

  const defaultLocale = useLocale()

  if (value == null) {
    return null
  }

  const date = new Date(value)

  if (isNaN(date.getTime())) {
    // Failed to convert to date
    warn(`Could not convert to Date the value: ${value}`)
    return null
  }

  return <>{formatDate(date, locale ?? defaultLocale, formatOptions)}</>
}
