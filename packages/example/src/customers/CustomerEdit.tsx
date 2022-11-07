import { EuiButton } from "@elastic/eui"
import { useRecordId, useRedirectLink } from "@react-mool/core"
import { DeleteButton, Edit, EditHeader } from "@react-mool/eui"
import { Customer, GeneratedSchema } from "../gqless"
import { Form } from "./Form"

type CustomerUpdateInput = Omit<
  Parameters<GeneratedSchema["mutation"]["updateCustomer"]>[0],
  "id"
>

function initialValues(data: Customer): CustomerUpdateInput {
  return {
    first_name: data.first_name,
    last_name: data.last_name,
    address: data.address,
    city: data.city,
    birthday: data.birthday,
    email: data.email,
    zipcode: data.zipcode,
  }
}

const NextButton = () => {
  const currentId = useRecordId()
  const redirect = useRedirectLink()

  return <EuiButton {...redirect("edit", { id: Number(currentId) + 1 })}>Next</EuiButton>
}

export const CustomerEdit = () => {
  return (
    <Edit initialValues={initialValues}>
      <EditHeader actions={[<DeleteButton asIcon />, <NextButton />]} />
      <Form />
    </Edit>
  )
}
