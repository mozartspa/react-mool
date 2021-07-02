import { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"
import { DataProvider, DataProviderContext } from "../dataProvider"

export type AdminCoreProps = {
  dataProvider: DataProvider
  children?: ReactNode
}

export const AdminCore = (props: AdminCoreProps) => {
  const { dataProvider, children } = props

  return (
    <DataProviderContext.Provider value={dataProvider}>
      <BrowserRouter>{children}</BrowserRouter>
    </DataProviderContext.Provider>
  )
}
