import { EuiSpacer } from "@elastic/eui"
import {
  DeleteButton,
  Edit,
  EditHeader,
  Row,
  TextAreaInput,
  TextInput,
  UpdateButton,
} from "@react-mool/eui"
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
  return (
    <Edit initialValues={initialValues}>
      <EditHeader actions={[<DeleteButton />]} showHorizontalRule />
      <div style={{ maxWidth: 900 }}>
        <Row>
          <TextInput name="reference" />
          <TextInput name="category_id" />
        </Row>
        <Row spacer>
          <TextInput name="price" type="number" />
          <TextInput name="stock" type="number" />
        </Row>
        <Row spacer>
          <TextInput name="image" />
          <TextInput name="thumbnail" />
        </Row>
        <Row spacer>
          <TextInput name="height" type="number" />
          <TextInput name="width" type="number" />
        </Row>
        <TextAreaInput name="description" fullWidth />
      </div>
      <EuiSpacer />
      <UpdateButton />
    </Edit>
  )
}
