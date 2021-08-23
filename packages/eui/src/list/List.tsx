import { ListBase, ListBaseProps } from "@react-mool/core"
import { ReactNode } from "react"
import { ListBreadcrumbs } from "./ListBreadcrumbs"

export type ListProps<TRecord = any, TFilter = any> = ListBaseProps<TRecord, TFilter> & {
  breadcrumbs?: ReactNode
}

export const List = (props: ListProps) => {
  const { breadcrumbs = <ListBreadcrumbs />, children, ...listProps } = props

  return (
    <ListBase {...listProps}>
      {(list) => (
        <>
          {breadcrumbs}
          {children instanceof Function ? children(list) : children}
        </>
      )}
    </ListBase>
  )
}
