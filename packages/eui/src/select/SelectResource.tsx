import {
  GetListParams,
  useGetListForOptions,
  useGetRecordId,
  useGetRecordName,
} from "@react-mool/core"
import { useMemo } from "react"
import { Select, SelectOption, SelectProps } from "../select/Select"

export type SelectResourceProps<TRecord = any, TFilter = any> = Omit<
  SelectProps,
  "options"
> & {
  resource: string
  filter?: TFilter
  sortField?: GetListParams["sortField"]
  sortOrder?: GetListParams["sortOrder"]
  maxSize?: number
  toOptions?: (records: TRecord[]) => SelectOption[]
  /** Options added after the ones of the records, once they are loaded. */
  extraOptions?: SelectOption[]
}

export const SelectResource = <TRecord extends any, TFilter>(
  props: SelectResourceProps<TRecord, TFilter>
) => {
  const {
    resource,
    filter,
    sortField,
    sortOrder,
    maxSize = 2000,
    toOptions,
    extraOptions,
    ...rest
  } = props

  const getId = useGetRecordId(resource)
  const getName = useGetRecordName(resource)

  const query = useGetListForOptions<TRecord, TFilter>(
    { page: 1, pageSize: maxSize, filter, sortField, sortOrder },
    {
      resource,
    }
  )

  const options = useMemo(() => {
    if (!query.data) {
      return []
    }

    const options = toOptions
      ? toOptions(query.data.items)
      : query.data.items.map((item) => {
          const opt: SelectOption = {
            value: getId(item),
            label: getName(item),
          }
          return opt
        })

    return extraOptions ? [...options, ...extraOptions] : options
  }, [query.data, toOptions, extraOptions, getId, getName])

  return (
    <Select {...rest} options={options} isLoading={rest.isLoading ?? query.isLoading} />
  )
}
