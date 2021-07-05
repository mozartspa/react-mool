import { DataProvider, ValidationError } from "@react-mool/core"
import { selectFields } from "gqless"
import pluralize from "pluralize"
import { client, resolved } from "./gqless"

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.substring(1)
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const dataProvider: DataProvider = {
  id: (_resource, record) => record.id,
  getOne: async (resource, params) => {
    await wait(1000)
    return await resolved(
      () => {
        const record = (client.query as any)[capitalize(resource)]({
          id: String(params.id),
        })
        return selectFields(record, "*", 2)
      },
      {
        noCache: true,
      }
    )
  },
  getList: async (
    resource,
    { page: pageParam, pageSize, sortField, sortOrder, filter }
  ) => {
    const page = pageParam - 1
    return await resolved(
      () => {
        const items = (client.query as any)[`all${capitalize(pluralize(resource))}`]({
          page,
          perPage: pageSize,
          sortField,
          sortOrder,
          filter,
        })

        const total = (client.query as any)[`_all${capitalize(pluralize(resource))}Meta`](
          {
            page,
            perPage: pageSize,
            filter,
          }
        )?.count

        return {
          items: selectFields(items, "*", 2),
          total,
        }
      },
      {
        noCache: true,
      }
    )
  },
  create: async (resource, params) => {
    await wait(1000)
    return await resolved(
      () => {
        const record = (client.mutation as any)[`create${capitalize(resource)}`](params)
        return selectFields(record, "*", 2)
      },
      {
        noCache: true,
      }
    )
  },
  update: async (resource, params) => {
    await wait(1000)

    // fake validation error
    if (resource === "product" && params.data.description?.length < 5) {
      throw new ValidationError({
        description: "Must be at least 5 chars long.",
      })
    }

    return await resolved(
      () => {
        const record = (client.mutation as any)[`update${capitalize(resource)}`]({
          ...params.data,
          id: String(params.id),
        })
        return selectFields(record, "*", 2)
      },
      { noCache: true }
    )
  },
  delete: async (resource, params) => {
    await wait(1000)

    return await resolved(
      () => {
        const record = (client.mutation as any)[`remove${capitalize(resource)}`]({
          id: String(params.id),
        })
        return selectFields(record, "*", 2)
      },
      { noCache: true }
    )
  },
}
