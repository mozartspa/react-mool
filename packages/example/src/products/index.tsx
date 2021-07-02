import {
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
} from "@elastic/eui"
import { useGetList, useGetOne } from "@react-mool/core"
import { useLinkProps } from "@react-mool/eui"
import { Fragment } from "react"
import { Product } from "../gqless"

export const ProductDetail = () => {
  const { data } = useGetOne("1")

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const ProductList = () => {
  const { data } = useGetList<Product>({
    page: 1,
    pageSize: 10,
    sortField: "",
    sortOrder: "asc",
  })

  const link = useLinkProps()

  return (
    <EuiDescriptionList>
      {data?.items.map((item) => (
        <Fragment key={item.id}>
          <EuiDescriptionListTitle>{item.reference}</EuiDescriptionListTitle>
          <EuiDescriptionListDescription>
            <a {...link(`/products/${item.id}`)}>Detail</a>
          </EuiDescriptionListDescription>
        </Fragment>
      ))}
    </EuiDescriptionList>
  )
}
