import { CreateBase, CreateBaseProps } from "@react-mool/core"
import { ReactNode } from "react"
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

  return (
    <CreateBase {...createProps}>
      {(createForm) => (
        <>
          {breadcrumbs}
          {preventLeave && <PreventLeaveForm />}
          {children instanceof Function ? children(createForm) : children}
        </>
      )}
    </CreateBase>
  )
}
