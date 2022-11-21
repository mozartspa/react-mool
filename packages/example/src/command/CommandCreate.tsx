import { Create, CreateHeader } from "@react-mool/eui"
import { Form } from "./Form"

const initialValues = {
  date: new Date(),
  basket: [
    {
      product_id: "0",
      quantity: 0,
    },
  ],
  returned: false,
  status: "ordered",
  total_ex_taxes: 0,
  delivery_fees: 0,
  tax_rate: 0,
  taxes: 0,
  total: 0,
  reference: (Math.random() + 1).toString(36).substring(7),
}

export const CommandCreate = () => {
  return (
    <Create initialValues={initialValues}>
      <CreateHeader />
      <Form />
    </Create>
  )
}
