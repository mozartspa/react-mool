import { useLocale } from "@react-mool/core"
import { ColumnComponentProps } from "./Column"

const hasNumberFormat = !!(
  typeof Intl === "object" &&
  Intl &&
  typeof Intl.NumberFormat === "function"
)

function formatNumber(
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

export type NumberColumnProps = ColumnComponentProps & {
  locale?: string | string[]
  formatOptions?: Intl.NumberFormatOptions
}

export const NumberColumn: React.FC<NumberColumnProps> = (props) => {
  const { locale, formatOptions } = props

  const value = Number(props.value)
  const defaultLocale = useLocale()

  if (isNaN(value)) {
    return null
  } else {
    return <>{formatNumber(value, locale ?? defaultLocale, formatOptions)}</>
  }
}

NumberColumn.defaultProps = {
  align: "right",
}
