import { EuiPageHeader, EuiSpacer } from "@elastic/eui"
import { Exp, GetListParams } from "@react-mool/core"
import { Datagrid2 } from "@react-mool/eui"
import React, { ReactNode, useState } from "react"
import { useQuery } from "react-query"
import { CategoryFilter, everything, ProductFilter, ProductInput } from "../generated"
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

async function run() {
  const result = await fetchProducts({ page: 1, pageSize: 10 })
}

const ProductListBlaBla = () => {
  const [items, setItems] = useState<ProductListItem[]>()
  const query = useQuery({
    queryKey: ["mykey", { page: 1, pageSize: 10 }],
    queryFn: () => fetchProducts({ page: 1, pageSize: 10 }),
  })

  return (
    <div>
      {items?.map((item) => (
        <div>{item?.price}</div>
      ))}
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  )
}

type ProductListItem = Exp.QueryListItemType<typeof fetchProducts>

const MyList = createList({
  query: fetchProducts,
})

const MyList2 = createList({
  query: fetchProducts,
})

const MyDatagrid = createDatagrid({
  list: MyList.Context,
})

export const ProductList2 = () => {
  const [filter, setFilter] = useState<CategoryFilter>()

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
          <Datagrid2
            list={{ ...list, page: 10 }}
            getItemId={(item) => item?.id ?? ""}
            rowClick="select"
            selectable
          />
          <Datagrid2
            {...list}
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

type DeleteButtonProps<TID> = {
  id: TID
  mutation: (id: TID) => Promise<any>
}

const DeleteButton = <TID extends any>(props: DeleteButtonProps<TID>) => {
  const { mutation } = props

  return null
}

const deleteProduct = async (id: number) => {
  // ....
}

// ;<DeleteButton id={5} mutation={deleteProduct} />

type CreateFormProps<TValues> = {
  mutation: (values: TValues) => Promise<any>
  initialValues?: TValues
  children?: (form: any) => ReactNode
}

const CreateForm = <TValues extends any>(props: CreateFormProps<TValues>) => {
  const { mutation } = props

  return null
}

const createMutation = async (product: Partial<ProductInput>) => {
  // ...
}

;<CreateForm mutation={createMutation} initialValues={{ width: 40, price: 999 }}>
  {(form) => {
    return (
      <>
        <CreateFormInputs form={form} />
      </>
    )
  }}
</CreateForm>

type CreateFormInputsProps = {
  form: UseFormResult<ProductInput>
}

const CreateFormInputs = (props: CreateFormInputsProps) => {
  const {
    form: { control },
  } = props

  return (
    <>
      <TextInput control={control} name="pincopallo" />
    </>
  )
}

const list = useList({ query: fetchProducts })

const queryList = useQueryList(fetchProduct, { page: 1, pageSize: 100 })
