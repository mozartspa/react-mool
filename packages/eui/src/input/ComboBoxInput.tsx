import { EuiComboBox, EuiComboBoxOptionOption, EuiComboBoxProps } from "@elastic/eui"
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

export type ComboBoxInputProps = InputProps & ComboBoxProps

export const ComboBoxInput = (props: ComboBoxInputProps) => {
  const { options = [] } = props

  return (
    <Input {...props}>
      {(field, inputProps) => {
        const value = Array.isArray(field.input.value) ? field.input.value : []
        const selectedOptions = options.filter((o) => value.includes(o.value ?? o.label))
        const handleChange = (opts: EuiComboBoxOptionOption[]) => {
          const newValue = opts.map((o) => o.value ?? o.label)
          field.setValue(newValue)
        }

        return (
          <EuiComboBox
            {...inputProps}
            selectedOptions={selectedOptions}
            onBlur={field.input.onBlur}
            onChange={handleChange}
          />
        )
      }}
    </Input>
  )
}
