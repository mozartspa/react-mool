import { ResourceDefinition } from "../../../core/dist/esm"
import { Category } from "../gqless"
import { CategoryCreate } from "./CategoryCreate"
import { CategoryDetail } from "./CategoryDetail"
import { CategoryEdit } from "./CategoryEdit"
import { CategoryList } from "./CategoryList"

export const CategoryResource: ResourceDefinition<Category> = {
  name: "category",
  icon: "package",
  create: CategoryCreate,
  edit: CategoryEdit,
  detail: CategoryDetail,
  list: CategoryList,
  recordName: (record) => record.name ?? "",
}
