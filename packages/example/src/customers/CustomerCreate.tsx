import { Create, CreateHeader } from "@react-mool/eui"
import { Form } from "./Form"

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  address: "",
  zipcode: "",
  city: "",
  birthday: "",
}

export const CustomerCreate = () => {
  return (
    <Create initialValues={initialValues}>
      <CreateHeader />
      <Form />
    </Create>
  )
}
