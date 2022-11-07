import { EuiSpacer } from "@elastic/eui"
import { ShowForCrud } from "@react-mool/core"
import { EditButton, Row, SaveButton, TextControl } from "@react-mool/eui"

export const Form = () => {
  return (
    <div style={{ maxWidth: 900 }}>
      <Row>
        <TextControl name="name" required />
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
