import { EuiSpacer } from "@elastic/eui"
import { Edit, EditHeader, TextInput, UpdateButton } from "@react-mool/eui"
import { GeneratedSchema, Product } from "../gqless"

type ProductUpdateInput = Omit<
  Parameters<GeneratedSchema["mutation"]["updateProduct"]>[0],
  "id"
>

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

export const ProductUpdate = () => {
  //const translate = useTranslate()

  return (
    <Edit initialValues={initialValues}>
      <EditHeader title="Risk index" icon={false} />
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
      <UpdateButton />
    </Edit>
  )
}
