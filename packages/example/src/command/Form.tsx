import { EuiSpacer } from "@elastic/eui"
import { ShowForCrud } from "@react-mool/core"
import {
  DateControl,
  EditButton,
  NumberControl,
  Row,
  SaveButton,
  SelectControl,
  SelectResourceControl,
  TextControl,
  useControlValue,
} from "@react-mool/eui"
import { observer } from "mobx-react-lite"
import React from "react"

type OrderRowType = {
  orderNumber: number
}

const OrderRow = (props: OrderRowType) => {
  const { orderNumber } = props

  return (
    <Row alignItems="center">
      <SelectResourceControl
        fullWidth
        name={`basket.${orderNumber}.product_id`}
        label="Product ID"
        resource="product"
        required
      />
      <NumberControl
        fullWidth
        label="Amount"
        name={`basket.${orderNumber}.quantity`}
        min={1}
        required
      />
    </Row>
  )
}

export const Form = observer(() => {
  const basket = useControlValue("basket")
  return (
    <div style={{ maxWidth: 900 }}>
      <Row>
        <DateControl name="date" required />
        <SelectResourceControl name="customer_id" resource="customer" />
      </Row>
      <Row>
        {basket.map((_: any, index: number) => (
          <OrderRow key={index} orderNumber={index} />
        ))}
      </Row>
      <Row>
        <NumberControl name="taxes" required />
        <NumberControl name="tax_rate" required />
        <NumberControl name="delivery_fees" required />
      </Row>
      <Row>
        <NumberControl name="total" required />
        <NumberControl name="total_ex_taxes" required />
      </Row>
      <Row>
        <SelectControl
          name="status"
          options={[
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "Cancelled" },
            { label: "Ordered", value: "ordered" },
          ]}
          required
        />
        <TextControl name="reference" required />
        <SelectControl
          name="returned"
          options={[
            { label: "Returned", value: true },
            { label: "Not returned", value: false },
          ]}
          required
        />
      </Row>
      <EuiSpacer size="l" />
      <ShowForCrud modes={["create", "edit"]}>
        <SaveButton />
      </ShowForCrud>
      <ShowForCrud modes={["detail"]}>
        <EditButton />
      </ShowForCrud>
    </div>
  )
})
