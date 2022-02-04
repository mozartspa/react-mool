import { EuiComboBoxOptionOption } from "@elastic/eui"
import {
  GetListParams,
  useDataProvider,
  useGetList,
  useGetRecordId,
  useGetRecordName,
} from "@react-mool/core"
import { useCallback, useMemo } from "react"
import { ComboBoxInput, ComboBoxInputProps } from "./ComboBoxInput"

export type ComboBoxResourceInputProps<TRecord = any, TFilter = any> = Omit<
  ComboBoxInputProps,
  "options" | "async" | "isLoading"
> & {
  resource: string
  filter?: TFilter
  sortField?: GetListParams["sortField"]
  sortOrder?: GetListParams["sortOrder"]
  maxSize?: number
  toOptions?: (records: TRecord[]) => EuiComboBoxOptionOption[]
}

export const ComboBoxResourceInput = <TRecord extends any = any, TFilter = any>(
  props: ComboBoxResourceInputProps<TRecord, TFilter>
) => {
  const {
    resource,
    filter,
    sortField,
    sortOrder,
    maxSize = 2000,
    toOptions,
    ...rest
  } = props

  const getId = useGetRecordId(resource)
  const getName = useGetRecordName(resource)
  const dataProvider = useDataProvider()

  const query = useGetList<TRecord, TFilter>(
    { page: 1, pageSize: maxSize, filter, sortField, sortOrder },
    {
      resource,
    }
  )

  const options = useMemo(() => {
    if (!query.data) {
      return []
    }

    if (toOptions) {
      return toOptions(query.data.items)
    }

    return query.data.items.map((item) => {
      const opt: EuiComboBoxOptionOption = {
        value: getId(item),
        label: getName(item),
      }
      return opt
    })
  }, [query.data, toOptions, getId, getName])

  const format = useCallback(
    (value: any) => {
      if (!Array.isArray(value)) {
        return []
      }

      // If array of scalars, we're good to go.
      // Otherwise we suppose it's an array of records, and so we extract their ids.
      const ids = value
        .map((val) => {
          if (typeof val === "object") {
            return dataProvider.id(resource, val)
          } else {
            return val
          }
        })
        .filter(Boolean)

      return ids
    },
    [dataProvider, resource]
  )

  // Parse function is used only to be sure that before submission
  // the value of the field is converted in the correct format.
  const parse = useCallback((value: any) => value, [])

  return (
    <ComboBoxInput
      {...rest}
      format={rest.format ?? format}
      parse={rest.parse ?? parse}
      options={options}
      isLoading={query.isLoading}
    />
  )
}
