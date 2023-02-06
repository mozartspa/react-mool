import { createQueries, GetListParams } from "@react-mool/core-v2"
import { everything, ProductFilter } from "../generated"
import { gqlClient } from "../gqlClient"

export const ProductQueries = createQueries({
  cacheKey: "product",
  queries: {
    getList: async (params: GetListParams<ProductFilter>) => {
      const items =
        (await gqlClient.chain.query
          .allProducts({
            filter: params.filter,
            page: params.page,
            perPage: params.pageSize,
            sortField: params.sortField,
            sortOrder: params.sortOrder,
          })
          .get({ ...everything })) ?? []

      const total =
        (await gqlClient.chain.query
          ._allProductsMeta({ filter: params.filter })
          .count.get()) ?? 0

      return {
        items,
        total,
      }
    },
    getOne: async (id: string) => {
      return await gqlClient.chain.query.Product({ id }).get({ ...everything })
    },
  },
})
