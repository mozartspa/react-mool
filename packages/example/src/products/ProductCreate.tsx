import { Create, CreateHeader } from "@react-mool/eui"
import { Form } from "./Form"

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

export const ProductCreate = () => {
  return (
    <Create initialValues={initialValues}>
      <CreateHeader />
      <Form />
    </Create>
  )
}
