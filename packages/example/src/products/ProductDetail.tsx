import { useGetOne } from "../../../core/dist"

export const ProductDetail = () => {
  const { data } = useGetOne("1", { resource: "Category" })

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
