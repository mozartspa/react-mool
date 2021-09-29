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
    return value.toLocaleDateString(locale, formatOptions)
  } else {
    return value
  }
}
