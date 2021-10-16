import { useTranslate } from "@react-mool/core"
import { RadioGroupOption } from "../input"
import { Value, ValueProps } from "./Value"

export type RadioGroupValueProps = ValueProps & {
  options: RadioGroupOption[]
}

export const RadioGroupValue = (props: RadioGroupValueProps) => {
  const { options } = props

  const translate = useTranslate()

  return (
    <Value {...props}>
      {({ value }) => {
        const selectedOption = options.find((o) => o.value === value)

        if (!selectedOption) {
          return null
        }

        const label = translate(selectedOption.label)

        return label ?? selectedOption.value
      }}
    </Value>
  )
}
