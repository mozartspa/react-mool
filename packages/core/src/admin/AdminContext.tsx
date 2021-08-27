import { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider, AuthProvider, defaultAuthProvider } from "../auth"
import { DataProvider, DataProviderContext } from "../dataProvider"
import { I18nProvider, TranslationContextProvider } from "../i18n"
import { defaultI18nProvider } from "../i18n/defaultI18nProvider"
import { NotificationContext, useNotification } from "../notify"
import {
  ResourceDefinitions,
  ResourceDefinitionsContextProvider,
} from "../resource/definitions"

export type AdminContextProps = {
  dataProvider: DataProvider
  i18nProvider?: I18nProvider
  authProvider?: AuthProvider
  queryClient?: QueryClient
  resources?: ResourceDefinitions
  children?: ReactNode
}

export const AdminContext = (props: AdminContextProps) => {
  const {
    dataProvider,
    i18nProvider = defaultI18nProvider,
    authProvider = defaultAuthProvider,
    resources = [],
    children,
  } = props

  const [queryClient] = useState(() => props.queryClient || new QueryClient())
  const notifications = useNotification()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider authProvider={authProvider}>
        <DataProviderContext.Provider value={dataProvider}>
          <NotificationContext.Provider value={notifications}>
            <TranslationContextProvider i18nProvider={i18nProvider}>
              <ResourceDefinitionsContextProvider definitions={resources}>
                <BrowserRouter>{children}</BrowserRouter>
              </ResourceDefinitionsContextProvider>
            </TranslationContextProvider>
          </NotificationContext.Provider>
        </DataProviderContext.Provider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
