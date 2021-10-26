import { useLocale } from "@react-mool/core"
import { formatDate } from "../helpers"
import { warn } from "../helpers/console"

export type DateTimeProps = {
  value: number | string | Date | null | undefined
  locale?: string | string[]
  formatOptions?: Intl.DateTimeFormatOptions
}

export const DateTime = (props: DateTimeProps) => {
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
