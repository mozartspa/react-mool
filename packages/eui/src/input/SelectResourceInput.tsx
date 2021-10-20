import { useDataProvider, useTranslate } from "@react-mool/core"
import { ReactNode, useCallback } from "react"
import { useGetResourceFieldLabel } from "../helpers"
import { SelectResource, SelectResourceProps } from "../select/SelectResource"
import { Input, InputProps } from "./Input"

const defaultEmptyValue = () => null

export type SelectResourceInputProps<TRecord = any, TFilter = any> = InputProps &
  Omit<SelectResourceProps<TRecord, TFilter>, "value" | "onChange" | "onBlur"> & {
    selectLabel?: ReactNode
  }

export const SelectResourceInput = <TRecord extends any, TFilter>(
  props: SelectResourceInputProps<TRecord, TFilter>
) => {
  const { selectLabel, resource, multiple, ...rest } = props

  const getFieldLabel = useGetResourceFieldLabel()
  const translate = useTranslate()
  const dataProvider = useDataProvider()

  const label = selectLabel ?? props.label ?? getFieldLabel(props.name)

  // Format function in order to support 2 different formats of value:
  // - multiple false: id of the related record or the related record directly.
  // - multiple true: array of ids of the related records, or array of records.
  const format = useCallback(
    (value: any) => {
      const maybeConvertToId = (value: any) => {
        return typeof value === "object" ? dataProvider.id(resource, value) : value
      }

      if (multiple) {
        if (value == null) {
          return []
        }
        const list = Array.isArray(value) ? value : [value]
        const ids = list.map((item) => maybeConvertToId(item)).filter(Boolean)
        return ids
      } else {
        return maybeConvertToId(value)
      }
    },
    [dataProvider, resource, multiple]
  )

  // Parse function is used only to be sure that before submission
  // the value of the field is converted in the correct format.
  const parse = useCallback((value: any) => value, [])

  return (
    <Input {...rest} format={props.format ?? format} parse={props.parse ?? parse}>
      {(field, inputProps) => (
        <SelectResource
          resource={resource}
          multiple={multiple}
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
