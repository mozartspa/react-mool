import { Admin } from "@react-mool/eui"
import { QueryClient, QueryClientProvider } from "react-query"
import { dataProvider } from "./dataProvider"
import { ProductDetail } from "./products/ProductDetail"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Admin dataProvider={dataProvider}>
        <ProductDetail />
      </Admin>
    </QueryClientProvider>
  )
}

export default App
