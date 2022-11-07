import { Create, CreateHeader } from "@react-mool/eui"
import { Form } from "./Form"

const initialValues = {
  date: new Date(),
  comment: "",
  rating: 1,
}

export const ReviewCreate = () => {
  return (
    <Create initialValues={initialValues}>
      <CreateHeader />
      <Form />
    </Create>
  )
}
