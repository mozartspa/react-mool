import { EuiButton } from "@elastic/eui"
import { useRecordId, useRedirectLink } from "@react-mool/core"
import { DeleteButton, Edit, EditHeader } from "@react-mool/eui"
import { GeneratedSchema, Product } from "../gqless"
import { Form } from "./Form"

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

const NextButton = () => {
  const currentId = useRecordId()
  const redirect = useRedirectLink()

  return <EuiButton {...redirect("edit", { id: Number(currentId) + 1 })}>Next</EuiButton>
}

export const ProductEdit = () => {
  return (
    <Edit initialValues={initialValues}>
      <EditHeader actions={[<DeleteButton asIcon />, <NextButton />]} />
      <Form />
    </Edit>
  )
}
