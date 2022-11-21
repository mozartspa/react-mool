import { Create, CreateHeader } from "@react-mool/eui"
import { Form } from "./Form"

const initialValues = {
  name: "",
}

export const CategoryCreate = () => {
  return (
    <Create initialValues={initialValues}>
      <CreateHeader />
      <Form />
    </Create>
  )
}
