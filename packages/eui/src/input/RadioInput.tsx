import { EuiRadio, EuiRadioProps, useGeneratedHtmlId } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode } from "react"
import { noFormat } from "./helpers/noFormat"
import { Input, InputProps } from "./Input"

export type RadioInputProps = InputProps & {
  radioLabel?: ReactNode
  disabled?: boolean
  radioProps?: Partial<EuiRadioProps>
}

export const RadioInput = (props: RadioInputProps) => {
  const id = useGeneratedHtmlId()
  const translate = useTranslate()

  const { radioLabel, format = noFormat, radioProps, ...rest } = props

  return (
    <Input {...rest} format={format}>
      {(field, inputProps) => (
        <EuiRadio
          id={id}
          {...inputProps}
          name={field.input.name}
          onBlur={field.input.onBlur}
          checked={!!field.value}
          onChange={(ev) => field.setValue(ev.target.checked)}
          label={translate(radioLabel)}
        />
      )}
    </Input>
  )
}
