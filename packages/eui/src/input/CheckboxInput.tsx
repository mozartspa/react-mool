import { EuiCheckbox, EuiSwitch, useGeneratedHtmlId } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode } from "react"
import { noFormat } from "./helpers/noFormat"
import { Input, InputProps } from "./Input"

export type CheckboxInputProps = InputProps & {
  checkboxLabel?: ReactNode
  disabled?: boolean
  asSwitch?: boolean
}

export const CheckboxInput = (props: CheckboxInputProps) => {
  const id = useGeneratedHtmlId()
  const translate = useTranslate()

  const { checkboxLabel, asSwitch = false, format = noFormat, ...rest } = props

  const Comp = asSwitch ? EuiSwitch : EuiCheckbox

  return (
    <Input {...rest} format={format}>
      {(field, inputProps) => (
        <Comp
          id={id}
          {...inputProps}
          children={undefined}
          name={field.input.name}
          onBlur={field.input.onBlur}
          checked={!!field.value}
          onChange={(ev) => field.setValue(ev.target.checked)}
          label={translate(checkboxLabel)}
        />
      )}
    </Input>
  )
}
