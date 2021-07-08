import { ResourceContext } from "@react-mool/core"
import { Admin } from "@react-mool/eui"
import { QueryClient, QueryClientProvider } from "react-query"
import { Route, Switch } from "react-router-dom"
import { dataProvider } from "./dataProvider"
import { i18nProvider } from "./i18nProvider"
import { Layout } from "./layout/Layout"
import { ProductCreate, ProductDetail, ProductList, ProductUpdate } from "./products"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Admin dataProvider={dataProvider} i18nProvider={i18nProvider} layout={Layout}>
        <ResourceContext.Provider value="product">
          <Switch>
            <Route path="/product/create">
              <ProductCreate />
            </Route>
            <Route path="/product/:id/edit">
              <ProductUpdate />
            </Route>
            <Route path="/product/:id">
              <ProductDetail />
            </Route>
            <Route path="/product">
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
