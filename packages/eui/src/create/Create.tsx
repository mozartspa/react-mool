import { CreateBase, CreateBaseProps, UseCreateFormResult } from "@react-mool/core"
import { Fragment, ReactNode } from "react"
import { PreventLeaveForm } from "../leave"
import { CreateBreadcrumbs } from "./CreateBreadcrumbs"

export type CreateProps<TRecord = any, TCreate = TRecord> = CreateBaseProps<
  TRecord,
  TCreate
> & {
  breadcrumbs?: ReactNode
  preventLeave?: boolean
  formProps?: (
    form: UseCreateFormResult<TRecord, TCreate>
  ) => React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
}

export const Create = (props: CreateProps) => {
  const {
    breadcrumbs = <CreateBreadcrumbs />,
    preventLeave = true,
    children,
    formProps,
    ...createProps
  } = props

  const WrapperLeave = preventLeave ? PreventLeaveForm : Fragment

  return (
    <CreateBase {...createProps}>
      {(createForm) => (
        <WrapperLeave>
          {breadcrumbs}
          <form
            onSubmit={createForm.form.handleSubmit}
            {...(formProps ? formProps(createForm) : {})}
          >
            {children instanceof Function ? children(createForm) : children}
          </form>
        </WrapperLeave>
      )}
    </CreateBase>
  )
}
