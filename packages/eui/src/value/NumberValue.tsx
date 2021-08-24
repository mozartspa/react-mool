import { useLocale } from "@react-mool/core"
import { formatNumber } from "../helpers/formatNumber"
import { Value, ValueProps } from "./Value"

export type NumberValueProps = ValueProps & {
  locale?: string | string[]
  formatOptions?: Intl.NumberFormatOptions
}

export const NumberValue = (props: NumberValueProps) => {
  const { locale, formatOptions } = props

  const defaultLocale = useLocale()

  return (
    <Value {...props}>
      {({ value }) => {
        const val = Number(value)

        if (isNaN(val)) {
          return null
        } else {
          return <>{formatNumber(val, locale ?? defaultLocale, formatOptions)}</>
        }
      }}
    </Value>
  )
}
