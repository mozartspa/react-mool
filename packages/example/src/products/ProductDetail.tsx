import { EuiSpacer } from "@elastic/eui"
import {
  Detail,
  DetailHeader,
  EditButton,
  NumberValue,
  Row,
  TextAreaValue,
  TextValue,
} from "@react-mool/eui"

export const ProductDetail = () => {
  return (
    <Detail>
      <DetailHeader />
      <div style={{ maxWidth: 900 }}>
        <Row>
          <TextValue name="reference" />
          <TextValue name="category_id" />
        </Row>
        <Row spacer>
          <NumberValue name="price" />
          <NumberValue name="stock" />
        </Row>
        <Row spacer>
          <TextValue name="image" />
          <TextValue name="thumbnail" />
        </Row>
        <Row spacer>
          <NumberValue name="height" />
          <NumberValue name="width" />
        </Row>
        <TextAreaValue name="description" fullWidth />
      </div>
      <EuiSpacer />
      <EditButton />
    </Detail>
  )
}
