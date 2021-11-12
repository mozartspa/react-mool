import { ResourceDefinition } from "../../../core/dist/esm"
import { Category } from "../gqless"

export const CategoryResource: ResourceDefinition<Category> = {
  name: "category",
  icon: "package",
  recordName: (record) => record.name ?? "",
}
