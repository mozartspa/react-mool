import { DateTime, DateTimeProps } from "../utilities"
import { Value, ValueProps } from "./Value"

export type DateValueProps = ValueProps & Pick<DateTimeProps, "locale" | "formatOptions">

export const DateValue = (props: DateValueProps) => {
  const { locale, formatOptions } = props

  return (
    <Value {...props}>
      {({ value }) => {
        return <DateTime value={value} locale={locale} formatOptions={formatOptions} />
      }}
    </Value>
  )
}
