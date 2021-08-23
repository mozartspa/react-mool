import { EuiButton, EuiSpacer } from "@elastic/eui"
import { DetailBase, EditBase } from "@react-mool/core"
import { BreadcrumbsItem, TextInput } from "@react-mool/eui"
import { observer } from "mobx-react-lite"
import { GeneratedSchema, Product } from "../gqless"

type ProductUpdateInput = Omit<
  Parameters<GeneratedSchema["mutation"]["updateProduct"]>[0],
  "id"
>

export const ProductDetail = () => {
  return (
    <DetailBase>
      {({ record }) => (
        <>
          <BreadcrumbsItem>Products</BreadcrumbsItem>
          <BreadcrumbsItem>{record?.reference}</BreadcrumbsItem>
          <pre>{JSON.stringify(record, null, 2)}</pre>
        </>
      )}
    </DetailBase>
  )
}

function initialValues(data: Product): ProductUpdateInput {
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
  return (
    <EditBase initialValues={initialValues}>
      {({ form }) => {
        return (
          <>
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
            <EuiButton
              onClick={form.submit}
              disabled={!form.isDirty}
              isLoading={form.isSubmitting}
            >
              Save
            </EuiButton>
            {/*<DebugForm />*/}
          </>
        )
      }}
    </EditBase>
  )
})
