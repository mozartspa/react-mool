import { ReactNode, useState } from "react"
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query"
import { AuthContextProvider, AuthProvider, defaultAuthProvider } from "../auth"
import { DataProvider, DataProviderContextProvider } from "../dataProvider"
import { I18nProvider, TranslationContextProvider } from "../i18n"
import { defaultI18nProvider } from "../i18n/defaultI18nProvider"
import { NotificationContext, useNotification } from "../notify"
import {
  ResourceDefinitions,
  ResourceDefinitionsContextProvider,
} from "../resource/definitions"

const queryClientDefaultOptions: DefaultOptions = {
  queries: {
    retry: 1,
  },
}

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

  const [queryClient] = useState(
    () =>
      props.queryClient || new QueryClient({ defaultOptions: queryClientDefaultOptions })
  )
  const notifications = useNotification()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider authProvider={authProvider}>
        <DataProviderContextProvider dataProvider={dataProvider}>
          <NotificationContext.Provider value={notifications}>
            <TranslationContextProvider i18nProvider={i18nProvider}>
              <ResourceDefinitionsContextProvider definitions={resources}>
                {children}
              </ResourceDefinitionsContextProvider>
            </TranslationContextProvider>
          </NotificationContext.Provider>
        </DataProviderContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
