import { CustomRoute, I18nProvider, ResourceContextProvider } from "@react-mool/core"
import { Admin } from "@react-mool/eui"
import "@react-mool/eui/dist/index.css"
import { useEffect, useState } from "react"
import { authProvider } from "./authProvider"
import { CategoryResource } from "./category"
import { CustomPage } from "./components/CustomPage"
import { Dashboard } from "./components/Dashboard"
import { dataProvider } from "./dataProvider"
import { polyglotI18nProviderAsync } from "./i18n/i18nProvider"
import { Layout } from "./layout/Layout"
import { ProductResource } from "./products"
import { ProductList2 } from "./products/ProductList2"

const customRoutes = [
  <CustomRoute path="/custom">
    <CustomPage />
  </CustomRoute>,
  <CustomRoute path="/product2">
    <ResourceContextProvider resource="product">
      <ProductList2 />
    </ResourceContextProvider>
  </CustomRoute>,
]

function App() {
  const [i18nProvider, setI18nProvider] = useState<I18nProvider | undefined>(undefined)

  useEffect(() => {
    polyglotI18nProviderAsync.then((provider) => setI18nProvider(provider))
  }, [])

  if (!i18nProvider) {
    return null
  }

  return (
    <Admin
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      authProvider={authProvider}
      layout={Layout}
      dashboard={<Dashboard />}
      resources={[ProductResource, CategoryResource]}
      customRoutes={customRoutes}
    />
  )
}

export default App
