import { ResourceContext } from "@react-mool/core"
import { Admin } from "@react-mool/eui"
import { QueryClient, QueryClientProvider } from "react-query"
import { Route, Switch } from "react-router-dom"
import { dataProvider } from "./dataProvider"
import { Layout } from "./layout/Layout"
import { ProductDetail, ProductList } from "./products"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Admin dataProvider={dataProvider} layout={Layout}>
        <ResourceContext.Provider value="product">
          <Switch>
            <Route path="/products/:id">
              <ProductDetail />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
          </Switch>
        </ResourceContext.Provider>

        <Route exact path="/">
          None
        </Route>
      </Admin>
    </QueryClientProvider>
  )
}

export default App
