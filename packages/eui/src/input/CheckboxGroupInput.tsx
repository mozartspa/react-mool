import { EuiCheckboxGroup, EuiCheckboxGroupOption } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode, useMemo } from "react"
import { useValueToId } from "./helpers/useValueToId"
import { Input, InputProps } from "./Input"

function valueArray(value: any) {
  if (Array.isArray(value)) {
    return value
  } else if (value != null) {
    return [value]
  } else {
    return []
  }
}

export type CheckboxGroupOption = {
  value: string | number
  label?: ReactNode
  disabled?: boolean
}

export type CheckboxGroupInputProps = InputProps & {
  options: CheckboxGroupOption[]
  disabled?: boolean
}

export const CheckboxGroupInput = (props: CheckboxGroupInputProps) => {
  const translate = useTranslate()
  const valueToId = useValueToId()

  const { options, ...rest } = props

  const euiOptions: EuiCheckboxGroupOption[] = useMemo(() => {
    return options.map((o) => ({
      id: valueToId(o.value),
      label: translate(o.label),
      disabled: o.disabled,
    }))
  }, [options])

  const buildIdToSelectedMap = (values: any[]) => {
    const map = {} as Record<string, boolean>
    values.forEach((val) => {
      const id = valueToId(val)
      map[id] = true
    })
    return map
  }

  return (
    <Input {...rest}>
      {(field) => {
        const values = valueArray(field.value)
        const idSelectedToMap = buildIdToSelectedMap(values)
        const handleChange = (optionId: string) => {
          const optionIndex = euiOptions.findIndex((o) => o.id === optionId)
          if (optionIndex !== -1) {
            const optionValue = options[optionIndex].value
            if (idSelectedToMap[optionId]) {
              // Remove from list
              field.setValue(values.filter((v) => v !== optionValue))
            } else {
              // Add to list
              field.setValue([...values, optionValue])
            }
          }
        }

        return (
          <EuiCheckboxGroup
            options={euiOptions}
            idToSelectedMap={idSelectedToMap}
            onBlur={field.input.onBlur}
            onChange={handleChange}
          />
        )
      }}
    </Input>
  )
}
