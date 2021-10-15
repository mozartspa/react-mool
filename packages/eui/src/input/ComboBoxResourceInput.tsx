import { EuiComboBoxOptionOption } from "@elastic/eui"
import {
  GetListParams,
  useGetList,
  useGetRecordId,
  useGetRecordName,
} from "@react-mool/core"
import { useMemo } from "react"
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

  return <ComboBoxInput {...rest} options={options} isLoading={query.isLoading} async />
}
