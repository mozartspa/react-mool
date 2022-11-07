import { ResourceDefinition } from "@react-mool/core"
import { CommandCreate } from "./CommandCreate"
import { CommandDetail } from "./CommandDetail"
import { CommandEdit } from "./CommandEdit"
import { CommandList } from "./CommandList"

export const CommandResource: ResourceDefinition = {
  name: "command",
  create: CommandCreate,
  list: CommandList,
  detail: CommandDetail,
  edit: CommandEdit,
  icon: "visTable",
  recordName: (record) => record.reference,
}
