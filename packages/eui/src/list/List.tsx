import { ListBase, ListBaseProps } from "@react-mool/core"

export type ListProps<TRecord = any, TFilter = any> = ListBaseProps<TRecord, TFilter>

export const List = (props: ListProps) => {
  return <ListBase {...props} />
}
