import "@elastic/eui/dist/eui_theme_amsterdam_light.css"
import {
  AdminContext,
  AdminContextProps,
  AdminRouter,
  AdminRouterProps,
} from "@react-mool/core"
import { ComponentType, ReactNode } from "react"
import { Layout } from "./layout/Layout"
import { Login } from "./login"

export type AdminProps = AdminContextProps &
  AdminRouterProps & {
    layout?: ComponentType
    children?: ReactNode
  }

export const Admin = (props: AdminProps) => {
  const { layout, children, loginPage = Login, ...coreProps } = props

  const AppLayout = layout || Layout

  return (
    <AdminContext {...coreProps}>
      <AdminRouter loginPage={loginPage}>
        <AppLayout>{children}</AppLayout>
      </AdminRouter>
    </AdminContext>
  )
}
