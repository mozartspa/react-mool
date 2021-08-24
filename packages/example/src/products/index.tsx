import { ResourceDefinition } from "../../../core/dist/esm"
import { ProductCreate } from "./ProductCreate"
import { ProductDetail } from "./ProductDetail"
import { ProductEdit } from "./ProductEdit"
import { ProductList } from "./ProductList"

export const ProductResource: ResourceDefinition = {
  name: "product",
  create: ProductCreate,
  edit: ProductEdit,
  detail: ProductDetail,
  list: ProductList,
  icon: "database",
  recordName: (record) => record.reference,
}
