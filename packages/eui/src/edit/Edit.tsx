import { EditBase, EditBaseProps, UseEditFormResult } from "@react-mool/core"
import { Fragment, ReactNode } from "react"
import { PreventLeaveForm } from "../leave"
import { EditBreadcrumbs } from "./EditBreadcrumbs"
import type { FormValues } from "@mozartspa/mobx-form"

export type EditProps<
  TRecord extends FormValues = any,
  TUpdate extends FormValues = TRecord
> = EditBaseProps<TRecord, TUpdate> & {
  breadcrumbs?: ReactNode
  preventLeave?: boolean
  formProps?: (
    form: UseEditFormResult<TRecord, TUpdate>
  ) => React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
}

export const Edit = (props: EditProps) => {
  const {
    breadcrumbs = <EditBreadcrumbs />,
    preventLeave = true,
    children,
    formProps,
    ...editProps
  } = props

  const WrapperLeave = preventLeave ? PreventLeaveForm : Fragment

  return (
    <EditBase {...editProps}>
      {(edit) => (
        <WrapperLeave>
          {breadcrumbs}
          <form onSubmit={edit.form.handleSubmit} {...(formProps ? formProps(edit) : {})}>
            {children instanceof Function ? children(edit) : children}
          </form>
        </WrapperLeave>
      )}
    </EditBase>
  )
}
