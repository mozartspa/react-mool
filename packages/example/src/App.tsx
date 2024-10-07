import { CustomRoute, I18nProvider } from "@react-mool/core"
import { Admin } from "@react-mool/eui"
import "@react-mool/eui/dist/index.css"
import { useEffect, useState } from "react"
import { authProvider } from "./authProvider"
import { CategoryResource } from "./category"
import { CommandResource } from "./command"
import { CustomPage } from "./components/CustomPage"
import { Dashboard } from "./components/Dashboard"
import { CustomerResource } from "./customers"
import { dataProvider } from "./dataProvider"
import { polyglotI18nProviderAsync } from "./i18n/i18nProvider"
import { Layout } from "./layout/Layout"
import { ProductResource } from "./products"
import { ReviewResource } from "./reviews"

const customRoutes = [
  <CustomRoute path="/custom">
    <CustomPage />
  </CustomRoute>,
]

const colors = {
  LIGHT: {
    body: "#ffffff",
    disabled: "#34374126",
    disabledText: "#515761",
  },
}

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
      euiProviderProps={{ colorMode: "light", modify: { colors } }}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      authProvider={authProvider}
      layout={Layout}
      dashboard={<Dashboard />}
      resources={[
        ProductResource,
        CategoryResource,
        CustomerResource,
        CommandResource,
        ReviewResource,
      ]}
      customRoutes={customRoutes}
    />
  )
}

export default App
