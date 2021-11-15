import { EditBase, EditBaseProps } from "@react-mool/core"
import { ReactNode } from "react"
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

  return (
    <EditBase {...editProps}>
      {(edit) => (
        <>
          {breadcrumbs}
          {preventLeave && <PreventLeaveForm />}
          {children instanceof Function ? children(edit) : children}
        </>
      )}
    </EditBase>
  )
}
