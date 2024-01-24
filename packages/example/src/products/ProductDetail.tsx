import { Detail, DetailHeader } from "@react-mool/eui"
import { Form } from "./Form"

export const ProductDetail = () => {
  return (
    <Detail refetchOnWindowFocus>
      <DetailHeader />
      <Form />
    </Detail>
  )
}
