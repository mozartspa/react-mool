import { EuiSpacer } from "@elastic/eui"
import {
  Create,
  CreateHeader,
  NumberInput,
  Row,
  SaveButton,
  TextAreaInput,
  TextInput,
} from "@react-mool/eui"
import { observer } from "mobx-react-lite"

const initialValues = {
  category_id: "1",
  description: "",
  height: 100,
  image: "",
  price: 0,
  reference: "",
  stock: 0,
  thumbnail: "",
  width: 0,
}

export const ProductCreate = observer(() => {
  return (
    <Create initialValues={initialValues}>
      <CreateHeader showHorizontalRule />
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
    </Create>
  )
})
