import { EuiButton } from "@elastic/eui"
import { useRecordId, useRedirectLink } from "@react-mool/core"
import { DeleteButton, Edit, EditHeader } from "@react-mool/eui"
import { Command, GeneratedSchema } from "../gqless"
import { Form } from "./Form"

type CommandUpdateInput = Omit<
  Parameters<GeneratedSchema["mutation"]["updateCommand"]>[0],
  "id"
>

function initialValues(data: Command): CommandUpdateInput {
  return {
    customer_id: data.customer_id,
    basket: data.basket,
    total: data.total,
    returned: data.returned,
    status: data.status,
    delivery_fees: data.delivery_fees,
    total_ex_taxes: data.total_ex_taxes,
    reference: data.reference,
    date: data.date,
    taxes: data.taxes,
    tax_rate: data.tax_rate,
  }
}

const NextButton = () => {
  const currentId = useRecordId()
  const redirect = useRedirectLink()

  return <EuiButton {...redirect("edit", { id: Number(currentId) + 1 })}>Next</EuiButton>
}

export const CommandEdit = () => {
  return (
    <Edit initialValues={initialValues}>
      <EditHeader actions={[<DeleteButton asIcon />, <NextButton />]} />
      <Form />
    </Edit>
  )
}
