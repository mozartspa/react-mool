import { EuiPageHeader, EuiSpacer } from "@elastic/eui"
import { Exp, GetListParams } from "@react-mool/core"
import { Datagrid2 } from "@react-mool/eui"
import { useState } from "react"
import { everything, ProductFilter } from "../generated"
import { gqlClient } from "../gqlClient"

const { createQueryListFunc, ListBase } = Exp

const fetchProducts = createQueryListFunc(
  async (params: GetListParams<ProductFilter>) => {
    const items = await gqlClient.chain.query
      .allProducts({
        page: params.page,
        perPage: params.pageSize,
        filter: params.filter,
        sortField: params.sortField,
        sortOrder: params.sortOrder,
      })
      .get({
        ...everything,
      })

    const meta = await gqlClient.chain.query
      ._allProductsMeta({
        page: params.page,
        perPage: params.pageSize,
        filter: params.filter,
      })
      .get({ count: 1 })

    return {
      items: items ?? [],
      total: meta?.count ?? 0,
    }
  }
)

type ProductListItem = Exp.QueryListItemType<typeof fetchProducts>

export const ProductList2 = () => {
  const [filter, setFilter] = useState<ProductFilter>()

  return (
    <ListBase query={fetchProducts} filter={filter}>
      {(list) => (
        <>
          <EuiPageHeader
            pageTitle="Prodotti"
            iconType="database"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convollis nisl non convallis tincidunt."
            //rightSideItems={actions}
            rightSideGroupProps={{ gutterSize: "s" }}
          />
          <EuiSpacer />
          <Datagrid2<ProductListItem>
            getItemId={(item) => item?.id ?? ""}
            rowClick="select"
            selectable
          />
          <pre>{JSON.stringify(list.items, null, 2)}</pre>
        </>
      )}
    </ListBase>
  )
}
