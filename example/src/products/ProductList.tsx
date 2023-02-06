import { EuiButton, EuiTitle } from "@elastic/eui"
import { useList } from "@react-mool/core-v2"
import { ProductQueries } from "./queries"

export const ProductList = () => {
  const list = useList({
    query: ProductQueries.getList,
    initialPageSize: 10,
    initialPage: 1,
  })

  const gotoNextPage = () => {
    list.setPage(list.page + 1)
  }

  return (
    <>
      <EuiTitle size="l">
        <h1>Products</h1>
      </EuiTitle>
      <EuiButton onClick={gotoNextPage}>Next page</EuiButton>
      {list.items.map((o, i) => (
        <pre key={i}>{JSON.stringify(o, null, 2)}</pre>
      ))}
    </>
  )
}
