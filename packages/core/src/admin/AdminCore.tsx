import { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"
import { DataProvider, DataProviderContext } from "../dataProvider"
import { defaultI18nProvider, I18nProvider, TranslationContextProvider } from "../i18n"
import { NotificationContext, useNotification } from "../notify"

export type AdminCoreProps = {
  dataProvider: DataProvider
  i18nProvider?: I18nProvider
  children?: ReactNode
}

export const AdminCore = (props: AdminCoreProps) => {
  const { dataProvider, i18nProvider = defaultI18nProvider, children } = props

  const notifications = useNotification()

  return (
    <DataProviderContext.Provider value={dataProvider}>
      <NotificationContext.Provider value={notifications}>
        <TranslationContextProvider i18nProvider={i18nProvider}>
          <BrowserRouter>{children}</BrowserRouter>
        </TranslationContextProvider>
      </NotificationContext.Provider>
    </DataProviderContext.Provider>
  )
}
