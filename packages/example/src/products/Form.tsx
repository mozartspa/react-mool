import { EuiSpacer } from "@elastic/eui"
import { ShowForCrud } from "@react-mool/core"
import {
  EditButton,
  NumberControl,
  Row,
  SaveButton,
  SelectResourceControl,
  TextAreaControl,
  TextControl,
} from "@react-mool/eui"

export const Form = () => {
  return (
    <div style={{ maxWidth: 900 }}>
      <Row>
        <TextControl name="reference" required />
        <SelectResourceControl name="category_id" resource="category" />
      </Row>
      <Row spacer>
        <NumberControl name="price" />
        <NumberControl name="stock" />
      </Row>
      <Row spacer>
        <TextControl name="image" />
        <TextControl name="thumbnail" />
      </Row>
      <Row spacer>
        <NumberControl name="height" />
        <NumberControl name="width" />
      </Row>
      <TextAreaControl name="description" fullWidth />
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
