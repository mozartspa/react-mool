import { EuiSpacer } from "@elastic/eui"
import {
  DeleteButton,
  Edit,
  EditHeader,
  NumberInput,
  Row,
  SaveButton,
  TextAreaInput,
  TextInput,
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
          <NumberInput name="price" />
          <NumberInput name="stock" />
        </Row>
        <Row spacer>
          <TextInput name="image" />
          <TextInput name="thumbnail" />
        </Row>
        <Row spacer>
          <NumberInput name="height" />
          <NumberInput name="width" />
        </Row>
        <TextAreaInput name="description" fullWidth />
      </div>
      <EuiSpacer />
      <SaveButton />
    </Edit>
  )
}
