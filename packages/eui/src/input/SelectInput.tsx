import { ReactNode } from "react"
import { useTranslate } from "../../../core/dist/esm"
import { useGetResourceFieldLabel } from "../helpers"
import { Select, SelectProps } from "../select"
import { noFormat } from "./helpers/noFormat"
import { Input, InputProps } from "./Input"

const defaultEmptyValue = () => null

export type SelectInputProps = InputProps &
  SelectProps & {
    selectLabel?: ReactNode
  }

export const SelectInput = (props: SelectInputProps) => {
  const { selectLabel, ...rest } = props

  const getFieldLabel = useGetResourceFieldLabel()
  const translate = useTranslate()

  const label = selectLabel ?? props.label ?? getFieldLabel(props.name)

  return (
    <Input {...rest} format={props.format ?? noFormat}>
      {(field, inputProps) => (
        <Select
          value={field.input.value}
          onBlur={() => field.setTouched(true)}
          onChange={(value) => field.setValue(value)}
          fullWidth={props.fullWidth}
          {...inputProps}
          emptyValue={inputProps.emptyValue ?? defaultEmptyValue}
          label={translate(label)}
        />
      )}
    </Input>
  )
}
