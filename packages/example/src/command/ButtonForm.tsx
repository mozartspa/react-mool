import { EuiButton, EuiButtonIcon, EuiPanel, EuiSpacer, EuiText } from "@elastic/eui"
import { ShowForCrud, useCreateFormContext, useGetList } from "@react-mool/core"
import {
  Create,
  CreateHeader,
  DateControl,
  NumberControl,
  Row,
  SaveButton,
  SelectResourceControl,
} from "@react-mool/eui"
import { observer } from "mobx-react-lite"
import React, { useCallback, useEffect } from "react"
import { Product } from "../gqless/schema.generated"

type OrderRowType = {
  orderNumber: number
  onRemove: () => void
  ordersLength: number
}

const initialValues = {
  date: new Date(),
  basket: [
    {
      product_id: "0",
      quantity: 1,
    },
  ],
  returned: false,
  status: "ordered",
  total_ex_taxes: 0,
  delivery_fees: 0,
  tax_rate: 0,
  taxes: 0,
  total: 0,
  reference: (Math.random() + 1).toString(36).substring(7),
}

const OrderRow = (props: OrderRowType) => {
  const { orderNumber, ordersLength, onRemove } = props

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
      {ordersLength !== 1 && (
        <EuiButtonIcon
          display="fill"
          iconType="trash"
          aria-label="Remove"
          onClick={onRemove}
        />
      )}
    </Row>
  )
}

type BasketProductType = { product_id: string; quantity: number }

const ButtonForm = observer((props: any) => {
  const { form } = useCreateFormContext()

  const products = useGetList<Product>(
    { page: 1, pageSize: 1000, sortField: "id" },
    {
      resource: "product",
    }
  )

  // Chiedere se ho modo di settare il campo product price direttamente dalla select resource products

  const recalculateTotal = useCallback(() => {
    let basket = form.values.basket

    if (basket.length > 0) {
      let pricePerId = basket.map((bProduct: BasketProductType) => {
        if (bProduct.quantity > 0) {
          let singlePrice: number =
            products.data?.items.filter(
              (product) => product.id === bProduct.product_id
            )[0].price || 0
          return singlePrice * bProduct.quantity
        } else {
          return 0
        }
      })
      let total = pricePerId.reduce((prev: number, next: number) => prev + next, 0)
      form.setFieldValue("total", total)
    }
  }, [form, products.data?.items])

  function onAdd() {
    let oldBasket = form.getFieldValue("basket")
    oldBasket.push({
      product_id: "0",
      quantity: 1,
    })
    form.setFieldValue("basket", oldBasket)
  }

  function onRemove(index: number) {
    let oldBasket = form.getFieldValue("basket")
    if (oldBasket.length === 1) return
    oldBasket.splice(index, 1)
    form.setFieldValue("basket", oldBasket)
  }

  useEffect(() => {
    recalculateTotal()
  }, [form, form.values.basket, recalculateTotal])

  return (
    <div style={{ maxWidth: 900 }}>
      <Row>
        <DateControl name="date" required />
        <SelectResourceControl name="customer_id" resource="customer" required />
      </Row>
      {form.values.basket.map((_: any, index: number) => (
        <OrderRow
          key={index}
          orderNumber={index}
          onRemove={() => onRemove(index)}
          ordersLength={form.values.basket.length}
        />
      ))}
      <Row>
        <EuiButton onClick={onAdd} iconType="heart">
          Add product
        </EuiButton>
      </Row>
      <EuiSpacer size="l" />

      <EuiPanel hasBorder={true}>
        <EuiText>
          Totale: <b>{form.values.total.toFixed(2)}</b>
        </EuiText>
      </EuiPanel>
      <EuiSpacer size="l" />
      <ShowForCrud modes={["create"]}>
        <SaveButton />
      </ShowForCrud>
    </div>
  )
})

export const ButtonCreate = () => {
  return (
    <Create initialValues={initialValues}>
      <CreateHeader />
      <ButtonForm />
    </Create>
  )
}
