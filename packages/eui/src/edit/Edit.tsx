import { EditBase, EditBaseProps } from "@react-mool/core"
import { Fragment, ReactNode } from "react"
import { PreventLeaveForm } from "../leave"
import { EditBreadcrumbs } from "./EditBreadcrumbs"

export type EditProps<TRecord = any, TUpdate = TRecord> = EditBaseProps<
  TRecord,
  TUpdate
> & {
  breadcrumbs?: ReactNode
  preventLeave?: boolean
}

export const Edit = (props: EditProps) => {
  const {
    breadcrumbs = <EditBreadcrumbs />,
    preventLeave = true,
    children,
    ...editProps
  } = props

  const WrapperLeave = preventLeave ? PreventLeaveForm : Fragment

  return (
    <EditBase {...editProps}>
      {(edit) => (
        <WrapperLeave>
          {breadcrumbs}
          {children instanceof Function ? children(edit) : children}
        </WrapperLeave>
      )}
    </EditBase>
  )
}
