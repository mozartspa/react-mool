import { ResourceDefinition } from "@react-mool/core"
import { Customer } from "../gqless"
import { CustomerCreate } from "./CustomerCreate"
import { CustomerDetail } from "./CustomerDetail"
import { CustomerEdit } from "./CustomerEdit"
import { CustomerList } from "./CustomerList"

export const CustomerResource: ResourceDefinition<Customer> = {
  name: "customer",
  icon: "user",
  create: CustomerCreate,
  edit: CustomerEdit,
  detail: CustomerDetail,
  list: CustomerList,
  recordName: (record) => record.first_name ?? "",
}
