import { EditBase, EditBaseProps } from "@react-mool/core"

export type EditProps<TRecord = any, TUpdate = any> = EditBaseProps<TRecord, TUpdate>

export const Edit = (props: EditProps) => {
  return <EditBase {...props} />
}
