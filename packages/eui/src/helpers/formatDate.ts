const hasDateTimeFormat = !!(
  typeof Intl === "object" &&
  Intl &&
  typeof Intl.DateTimeFormat === "function"
)

export function formatDate(
  value: Date,
  locale: string | string[],
  formatOptions?: Intl.DateTimeFormatOptions
) {
  if (hasDateTimeFormat) {
    return new Intl.DateTimeFormat(locale, formatOptions).format(value)
  } else {
    return value
  }
}
