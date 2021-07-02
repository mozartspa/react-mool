import { DataProvider } from "@react-mool/core"
import { selectFields } from "gqless"
import { client, resolved } from "./gqless"

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.substring(1)
}

const todo = () => Promise.reject(new Error("Not implemented"))

export const dataProvider: DataProvider = {
  id: (_resource, record) => record.id,
  getOne: async (resource, params) => {
    return await resolved(() => {
      const record = (client.query as any)[capitalize(resource)]({
        id: String(params.id),
      })
      return selectFields(record, "*")
    })
  },
  getList: todo,
  create: todo,
  update: todo,
  delete: todo,
}
