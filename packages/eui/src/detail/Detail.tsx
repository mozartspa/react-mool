import { DetailBase, DetailBaseProps } from "@react-mool/core"
import { ReactNode } from "react"
import { DetailBreadcrumbs } from "./DetailBreadcrumbs"

export type DetailProps<TRecord = any> = DetailBaseProps<TRecord> & {
  breadcrumbs?: ReactNode
}

export const Detail = (props: DetailProps) => {
  const { breadcrumbs = <DetailBreadcrumbs />, children, ...detailProps } = props

  return (
    <DetailBase {...detailProps}>
      {(detail) => (
        <>
          {breadcrumbs}
          {children instanceof Function ? children(detail) : children}
        </>
      )}
    </DetailBase>
  )
}
