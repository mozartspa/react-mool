import { EuiComboBox, EuiComboBoxOptionOption, EuiComboBoxProps } from "@elastic/eui"
import { ReactNode, useEffect, useState } from "react"
import { noFormat } from "./helpers/noFormat"
import { Input, InputProps } from "./Input"

type ComboBoxProps = Pick<
  EuiComboBoxProps<any>,
  | "className"
  | "style"
  | "options"
  | "renderOption"
  | "autoFocus"
  | "async"
  | "isClearable"
  | "isDisabled"
  | "isLoading"
  | "noSuggestions"
  | "placeholder"
  | "rowHeight"
  | "sortMatchesBy"
  | "delimiter"
>

type MoreProps = {
  keepUnknownValues?: boolean
  onUnknownValues?: (values: any[]) => void
  renderUnknownValuesHint?: (values: any[]) => ReactNode
}

export type ComboBoxInputProps = InputProps & ComboBoxProps & MoreProps

const EMPTY_ARRAY: any[] = []

export const ComboBoxInput = (props: ComboBoxInputProps) => {
  const {
    options = [],
    format = noFormat,
    keepUnknownValues = false,
    onUnknownValues,
    renderUnknownValuesHint,
    ...restProps
  } = props

  const [unknownValuesState, setUnknownValues] = useState<any[]>([])

  const helpText = renderUnknownValuesHint ? (
    <>
      {restProps.helpText}
      {renderUnknownValuesHint(unknownValuesState)}
    </>
  ) : (
    restProps.helpText
  )

  return (
    <Input {...restProps} format={format} helpText={helpText}>
      {(field, inputProps) => {
        const value = Array.isArray(field.input.value) ? field.input.value : EMPTY_ARRAY
        const unknownValues = value.filter(
          (val) => options.find((o) => val === (o.value ?? o.label)) === undefined
        )
        const selectedOptions = options.filter((o) => value.includes(o.value ?? o.label))
        const handleChange = (opts: EuiComboBoxOptionOption[]) => {
          let newValue = opts.map((o) => o.value ?? o.label)
          if (keepUnknownValues) {
            newValue = [...newValue, ...unknownValues]
          }
          field.setValue(newValue)
        }

        useEffect(() => {
          setUnknownValues(unknownValues)
          onUnknownValues?.(unknownValues)
        }, [JSON.stringify(unknownValues)])

        return (
          <EuiComboBox
            {...inputProps}
            options={options}
            selectedOptions={selectedOptions}
            onBlur={field.input.onBlur}
            onChange={handleChange}
            fullWidth={props.fullWidth}
          />
        )
      }}
    </Input>
  )
}
