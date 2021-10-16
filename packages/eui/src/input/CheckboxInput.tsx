import { EuiCheckbox, useGeneratedHtmlId } from "@elastic/eui"
import { ReactNode } from "react"
import { Input, InputProps } from "./Input"

export type CheckboxInputProps = InputProps & {
  checkboxLabel?: ReactNode
  disabled?: boolean
}

export const CheckboxInput = (props: CheckboxInputProps) => {
  const id = useGeneratedHtmlId()
  const { checkboxLabel, ...rest } = props

  return (
    <Input {...rest}>
      {(field, inputProps) => (
        <EuiCheckbox
          id={id}
          {...inputProps}
          name={field.input.name}
          onBlur={field.input.onBlur}
          checked={!!field.value}
          onChange={(ev) => field.setValue(ev.target.checked)}
          label={checkboxLabel}
        />
      )}
    </Input>
  )
}
