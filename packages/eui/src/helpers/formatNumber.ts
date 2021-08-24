const hasNumberFormat = !!(
  typeof Intl === "object" &&
  Intl &&
  typeof Intl.NumberFormat === "function"
)

export function formatNumber(
  value: number,
  locale: string | string[],
  formatOptions?: Intl.NumberFormatOptions
) {
  if (hasNumberFormat) {
    return value.toLocaleString(locale, formatOptions)
  } else {
    return value
  }
}
