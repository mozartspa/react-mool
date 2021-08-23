import { CreateBase, CreateBaseProps } from "@react-mool/core"
import { ReactNode } from "react"
import { CreateBreadcrumbs } from "./CreateBreadcrumbs"

export type CreateProps<TRecord = any, TCreate = TRecord> = CreateBaseProps<
  TRecord,
  TCreate
> & {
  breadcrumbs?: ReactNode
}

export const Create = (props: CreateProps) => {
  const { breadcrumbs = <CreateBreadcrumbs />, children, ...createProps } = props

  return (
    <CreateBase {...createProps}>
      {(createForm) => (
        <>
          {breadcrumbs}
          {children instanceof Function ? children(createForm) : children}
        </>
      )}
    </CreateBase>
  )
}
