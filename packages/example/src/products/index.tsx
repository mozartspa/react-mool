import { ResourceDefinition } from "../../../core/dist/esm"
import { ProductCreate } from "./ProductCreate"
import { ProductDetail } from "./ProductDetail"
import { ProductList } from "./ProductList"
import { ProductUpdate } from "./ProductUpdate"

export const ProductResource: ResourceDefinition = {
  name: "product",
  create: ProductCreate,
  edit: ProductUpdate,
  detail: ProductDetail,
  list: ProductList,
  icon: "database",
  recordName: (record) => record.reference,
}
