import { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider, AuthProvider, defaultAuthProvider } from "../auth"
import { DataProvider, DataProviderContext } from "../dataProvider"
import { defaultI18nProvider, I18nProvider, TranslationContextProvider } from "../i18n"
import { NotificationContext, useNotification } from "../notify"
import { ResourceDefinitionsContextProvider } from "../resource/definitions"

export type AdminContextProps = {
  dataProvider: DataProvider
  i18nProvider?: I18nProvider
  authProvider?: AuthProvider
  queryClient?: QueryClient
  children?: ReactNode
}

export const AdminContext = (props: AdminContextProps) => {
  const {
    dataProvider,
    i18nProvider = defaultI18nProvider,
    authProvider = defaultAuthProvider,
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
              <ResourceDefinitionsContextProvider>
                <BrowserRouter>{children}</BrowserRouter>
              </ResourceDefinitionsContextProvider>
            </TranslationContextProvider>
          </NotificationContext.Provider>
        </DataProviderContext.Provider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
