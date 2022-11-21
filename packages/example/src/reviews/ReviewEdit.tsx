import { EuiButton } from "@elastic/eui"
import { useRecordId, useRedirectLink } from "@react-mool/core"
import { DeleteButton, Edit, EditHeader } from "@react-mool/eui"
import { GeneratedSchema, Review } from "../gqless"
import { Form } from "./Form"

type ReviewUpdateInput = Omit<
  Parameters<GeneratedSchema["mutation"]["updateReview"]>[0],
  "id"
>

function initialValues(data: Review): ReviewUpdateInput {
  return {
    comment: data.comment,
    rating: data.rating,
  }
}

const NextButton = () => {
  const currentId = useRecordId()
  const redirect = useRedirectLink()

  return <EuiButton {...redirect("edit", { id: Number(currentId) + 1 })}>Next</EuiButton>
}

export const ReviewEdit = () => {
  return (
    <Edit initialValues={initialValues}>
      <EditHeader actions={[<DeleteButton asIcon />, <NextButton />]} />
      <Form />
    </Edit>
  )
}
