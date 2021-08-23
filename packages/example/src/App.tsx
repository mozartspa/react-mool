import { I18nProvider } from "@react-mool/core"
import { Admin, BreadcrumbsItem } from "@react-mool/eui"
import { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import { authProvider, TestAuth } from "./components/TestAuth"
import { dataProvider } from "./dataProvider"
import { polyglotI18nProviderAsync } from "./i18n/i18nProvider"
import { Layout } from "./layout/Layout"
import { ProductResource } from "./products"

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
      resources={[ProductResource]}
    >
      <Switch>
        <Route exact path="/custom">
          <BreadcrumbsItem>Custom route</BreadcrumbsItem>
          <h1>Custom route</h1>
        </Route>
        <Route exact path="/">
          <BreadcrumbsItem>Home</BreadcrumbsItem>
          <TestAuth />
        </Route>
      </Switch>
    </Admin>
  )
}

export default App
