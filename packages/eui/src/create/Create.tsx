import { CreateBase, CreateBaseProps } from "@react-mool/core"
import { Fragment, ReactNode } from "react"
import { PreventLeaveForm } from "../leave"
import { CreateBreadcrumbs } from "./CreateBreadcrumbs"

export type CreateProps<TRecord = any, TCreate = TRecord> = CreateBaseProps<
  TRecord,
  TCreate
> & {
  breadcrumbs?: ReactNode
  preventLeave?: boolean
}

export const Create = (props: CreateProps) => {
  const {
    breadcrumbs = <CreateBreadcrumbs />,
    preventLeave = true,
    children,
    ...createProps
  } = props

  const WrapperLeave = preventLeave ? PreventLeaveForm : Fragment

  return (
    <CreateBase {...createProps}>
      {(createForm) => (
        <WrapperLeave>
          {breadcrumbs}
          {children instanceof Function ? children(createForm) : children}
        </WrapperLeave>
      )}
    </CreateBase>
  )
}
