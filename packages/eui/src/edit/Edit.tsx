import { EditBase, EditBaseProps } from "@react-mool/core"
import { ReactNode } from "react"
import { EditBreadcrumbs } from "./EditBreadcrumbs"

export type EditProps<TRecord = any, TUpdate = any> = EditBaseProps<TRecord, TUpdate> & {
  breadcrumbs?: ReactNode
}

export const Edit = (props: EditProps) => {
  const { breadcrumbs = <EditBreadcrumbs />, children, ...editProps } = props

  return (
    <EditBase {...editProps}>
      {(edit) => (
        <>
          {breadcrumbs}
          {children instanceof Function ? children(edit) : children}
        </>
      )}
    </EditBase>
  )
}
