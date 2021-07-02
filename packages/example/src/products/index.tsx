import {
  EuiButton,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiSpacer,
} from "@elastic/eui"
import { useForm } from "@mozartspa/mobx-form"
import { useCreate, useGetList, useGetOne } from "@react-mool/core"
import { TextInput, useLinkProps } from "@react-mool/eui"
import { observer } from "mobx-react-lite"
import { Fragment } from "react"
import { GeneratedSchema, Product } from "../gqless"

type ProductCreateInput = Parameters<GeneratedSchema["mutation"]["createProduct"]>[0]

export const ProductDetail = () => {
  const { data } = useGetOne("1")

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const ProductList = () => {
  const { data } = useGetList<Product>({
    page: 1,
    pageSize: 10,
    sortField: "reference",
    sortOrder: "asc",
  })

  const link = useLinkProps()

  return (
    <>
      <EuiButton {...link("/products/create")} iconType="plus">
        Add
      </EuiButton>
      <EuiSpacer />
      <p>Total: {data?.total}</p>
      <EuiSpacer />
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
    </>
  )
}

export const ProductCreate = observer(() => {
  const mutation = useCreate()

  const form = useForm<ProductCreateInput>({
    initialValues: {
      category_id: "1",
      description: "",
      height: 100,
      image: "",
      price: 0,
      reference: "",
      stock: 0,
      thumbnail: "",
      width: 0,
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync(values)
      console.log("Uhhrray!")
    },
  })

  return (
    <form.Form>
      <TextInput name="reference" />
      <EuiSpacer />
      <EuiButton onClick={form.submit}>Create</EuiButton>
    </form.Form>
  )
})
