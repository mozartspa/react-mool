import {
  EuiButton,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiSpacer,
} from "@elastic/eui"
import { useForm } from "@mozartspa/mobx-form"
import { useCreate, useGetList, useGetOne, useUpdate } from "@react-mool/core"
import { TextInput, useLinkProps } from "@react-mool/eui"
import { observer } from "mobx-react-lite"
import { Fragment, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GeneratedSchema, Product } from "../gqless"

type ProductCreateInput = Parameters<GeneratedSchema["mutation"]["createProduct"]>[0]
type ProductUpdateInput = Omit<
  Parameters<GeneratedSchema["mutation"]["updateProduct"]>[0],
  "id"
>

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useGetOne(id)

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
              <a {...link(`/products/${item.id}`)}>Update</a>
              {" | "}
              <a {...link(`/products/${item.id}/detail`)}>Detail</a>
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

function preTransform(data: Product | undefined): ProductUpdateInput {
  if (!data) {
    return {}
  }

  return {
    category_id: data.category_id,
    description: data.description,
    height: data.height,
    image: data.image,
    price: data.price,
    reference: data.reference,
    stock: data.stock,
    thumbnail: data.thumbnail,
    width: data.width,
  }
}

export const ProductUpdate = observer(() => {
  const { id } = useParams<{ id: string }>()
  const { data: record } = useGetOne<Product>(id)
  const mutation = useUpdate()

  const form = useForm<ProductUpdateInput>({
    initialValues: preTransform(record),
    onSubmit: async (values) => {
      await mutation.mutateAsync({ id, data: values })
      console.log("Uhhrray!")
    },
  })

  useEffect(() => {
    form.reset(preTransform(record))
  }, [record, form])

  return (
    <form.Form>
      <TextInput name="reference" />
      <TextInput name="category_id" />
      <TextInput name="thumbnail" />
      <TextInput name="image" />
      <TextInput name="description" />
      <TextInput name="height" type="number" />
      <TextInput name="width" type="number" />
      <TextInput name="price" type="number" />
      <TextInput name="stock" type="number" />
      <EuiSpacer />
      <EuiButton onClick={form.submit}>Update</EuiButton>
    </form.Form>
  )
})
