import { EuiButton } from "@elastic/eui"
import { useRecordId, useRedirectLink } from "@react-mool/core"
import { DeleteButton, Edit, EditHeader, usePreventLeaveContext } from "@react-mool/eui"
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
  const leave = usePreventLeaveContext()

  const linkProps = redirect("edit", { id: Number(currentId) + 1 })

  return (
    <EuiButton
      {...linkProps}
      onClick={(ev: any) => {
        leave?.allowLeaveOnce(true)
        linkProps.onClick?.(ev)
      }}
    >
      Next
    </EuiButton>
  )
}

export const ProductEdit = () => {
  return (
    <Edit initialValues={initialValues}>
      <EditHeader actions={[<DeleteButton asIcon />, <NextButton />]} />
      <Form />
    </Edit>
  )
}
