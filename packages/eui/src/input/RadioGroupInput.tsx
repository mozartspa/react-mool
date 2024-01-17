import { EuiRadioGroup, EuiRadioGroupOption } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode, useMemo } from "react"
import { noFormat } from "./helpers/noFormat"
import { useValueToId } from "./helpers/useValueToId"
import { Input, InputProps } from "./Input"

export type RadioGroupOption = {
  value: string | number
  label?: ReactNode
  disabled?: boolean
}

export type RadioGroupInputProps = InputProps & {
  options: RadioGroupOption[]
  disabled?: boolean
}

export const RadioGroupInput = (props: RadioGroupInputProps) => {
  const translate = useTranslate()
  const valueToId = useValueToId()

  const { options, format = noFormat, disabled, ...rest } = props

  const euiOptions: EuiRadioGroupOption[] = useMemo(() => {
    return options.map((o) => ({
      id: valueToId(o.value),
      label: translate(o.label),
      disabled: o.disabled,
    }))
  }, [options, disabled])

  const getSelectedOption = (value: any) => {
    return options.find((o) => o.value === value)
  }

  return (
    <Input {...rest} format={noFormat}>
      {(field) => {
        const selectedOpt = getSelectedOption(field.value)
        const idSelected = selectedOpt ? valueToId(selectedOpt.value) : undefined
        const handleChange = (optionId: string) => {
          const optionIndex = euiOptions.findIndex((o) => o.id === optionId)
          if (optionIndex !== -1) {
            const optionValue = options[optionIndex].value
            field.setValue(optionValue)
          }
        }

        return (
          <EuiRadioGroup
            disabled={disabled}
            options={euiOptions}
            idSelected={idSelected}
            onBlur={field.input.onBlur}
            onChange={handleChange}
          />
        )
      }}
    </Input>
  )
}
