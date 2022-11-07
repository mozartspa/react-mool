import { EuiButton } from "@elastic/eui"
import { useRecordId, useRedirectLink } from "@react-mool/core"
import { DeleteButton, Edit, EditHeader } from "@react-mool/eui"
import { Category, GeneratedSchema } from "../gqless"
import { Form } from "./Form"

type CategoryUpdateInput = Omit<
  Parameters<GeneratedSchema["mutation"]["updateCategory"]>[0],
  "id"
>

function initialValues(data: Category): CategoryUpdateInput {
  return {
    name: data.name,
  }
}

const NextButton = () => {
  const currentId = useRecordId()
  const redirect = useRedirectLink()

  return <EuiButton {...redirect("edit", { id: Number(currentId) + 1 })}>Next</EuiButton>
}

export const CategoryEdit = () => {
  return (
    <Edit initialValues={initialValues}>
      <EditHeader actions={[<DeleteButton asIcon />, <NextButton />]} />
      <Form />
    </Edit>
  )
}
