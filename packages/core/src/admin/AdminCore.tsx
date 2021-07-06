import { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"
import { DataProvider, DataProviderContext } from "../dataProvider"
import { NotificationContext, useNotification } from "../notify"

export type AdminCoreProps = {
  dataProvider: DataProvider
  children?: ReactNode
}

export const AdminCore = (props: AdminCoreProps) => {
  const { dataProvider, children } = props

  const notifications = useNotification()

  return (
    <DataProviderContext.Provider value={dataProvider}>
      <NotificationContext.Provider value={notifications}>
        <BrowserRouter>{children}</BrowserRouter>
      </NotificationContext.Provider>
    </DataProviderContext.Provider>
  )
}
