import { useGetList, useResource } from "@react-mool/core"
import { ReactNode } from "react"

export type CountProps<TFilter = any> = {
  resource?: string
  filter?: TFilter | undefined
  children?: (count: number) => ReactNode
}

export const Count = (props: CountProps) => {
  const { filter, children } = props

  const resource = useResource(props.resource)

  const { data } = useGetList(
    {
      page: 1,
      pageSize: 1,
      filter,
    },
    {
      resource,
    }
  )

  if (!data) {
    return null
  } else {
    return <>{children ? children(data.total) : data.total}</>
  }
}
