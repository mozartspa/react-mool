import { useTranslate } from "@react-mool/core"
import { ReactNode } from "react"
import { useGetResourceFieldLabel } from "../helpers"
import { SelectResource, SelectResourceProps } from "../select/SelectResource"
import { noFormat } from "./helpers/noFormat"
import { Input, InputProps } from "./Input"

const defaultEmptyValue = () => null

export type SelectResourceInputProps<TRecord = any, TFilter = any> = InputProps &
  Omit<SelectResourceProps<TRecord, TFilter>, "value" | "onChange" | "onBlur"> & {
    selectLabel?: ReactNode
  }

export const SelectResourceInput = <TRecord extends any, TFilter>(
  props: SelectResourceInputProps<TRecord, TFilter>
) => {
  const { selectLabel, ...rest } = props

  const getFieldLabel = useGetResourceFieldLabel()
  const translate = useTranslate()

  const label = selectLabel ?? props.label ?? getFieldLabel(props.name)

  return (
    <Input {...rest} format={props.format ?? noFormat}>
      {(field, inputProps) => (
        <SelectResource
          value={field.input.value}
          onBlur={() => field.setTouched(true)}
          onChange={(value: any) => field.setValue(value)}
          fullWidth={props.fullWidth}
          {...inputProps}
          emptyValue={inputProps.emptyValue ?? defaultEmptyValue}
          label={translate(label)}
        />
      )}
    </Input>
  )
}
