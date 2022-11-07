import { EuiSpacer } from "@elastic/eui"
import { ShowForCrud } from "@react-mool/core"
import {
  DateControl,
  EditButton,
  RadioGroupControl,
  RadioGroupOption,
  Row,
  SaveButton,
  SelectControl,
  SelectResourceControl,
  TextAreaControl,
} from "@react-mool/eui"

export const Form = () => {
  const ratingOption: RadioGroupOption[] = Array.from(Array(5).keys()).map((number) => ({
    value: number++,
    label: number++,
  }))

  return (
    <div style={{ maxWidth: 900 }}>
      <Row>
        <SelectResourceControl name="product_id" resource="product" required />
        <DateControl name="date" required />
      </Row>
      <TextAreaControl name="comment" required fullWidth />
      <Row>
        <SelectResourceControl name="customer_id" resource="customer" required />
        <SelectResourceControl name="command_id" resource="command" required />
        <SelectControl
          name="status"
          options={[
            { value: "rejected", label: "Rejected" },
            { value: "pending", label: "Pending" },
            { value: "approved", label: "Approved" },
          ]}
        />
      </Row>
      <Row>
        <RadioGroupControl name="rating" required options={ratingOption} />
      </Row>
      <EuiSpacer />
      <ShowForCrud modes={["create", "edit"]}>
        <SaveButton />
      </ShowForCrud>
      <ShowForCrud modes={["detail"]}>
        <EditButton />
      </ShowForCrud>
    </div>
  )
}
