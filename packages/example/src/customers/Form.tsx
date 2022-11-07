import { EuiSpacer } from "@elastic/eui"
import { ShowForCrud } from "@react-mool/core"
import {
  DateControl,
  EditButton,
  NumberControl,
  Row,
  SaveButton,
  TextControl,
} from "@react-mool/eui"

export const Form = () => {
  return (
    <div style={{ maxWidth: 900 }}>
      <Row>
        <TextControl name="first_name" required />
        <TextControl name="last_name" required />
      </Row>
      <Row>
        <TextControl name="address" />
        <TextControl name="city" />
        <NumberControl name="zipcode" />
      </Row>
      <Row>
        <TextControl name="email" />
        <DateControl name="birthday" />
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
