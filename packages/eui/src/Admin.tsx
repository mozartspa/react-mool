import "@elastic/eui/dist/eui_theme_amsterdam_light.css"
import {
  AdminContext,
  AdminContextProps,
  AdminRouter,
  AdminRouterProps,
} from "@react-mool/core"
import React from "react"
import smoothscroll from "smoothscroll-polyfill"
import "./Admin.css"
import { ErrorBoundary } from "./error"
import { Layout } from "./layout/Layout"
import { Login } from "./login"

// apply smoothscroll polyfill
smoothscroll.polyfill()

export type AdminProps = AdminContextProps &
  AdminRouterProps & {
    errorBoundary?: false | React.ComponentType
  }

export const Admin = (props: AdminProps) => {
  const {
    layout,
    children,
    loginPage = Login,
    autoScrollToTop,
    errorBoundary: errorBoundaryProp,
    ...coreProps
  } = props

  const AppLayout = layout ?? Layout
  const AppErrorBoundary =
    errorBoundaryProp === false ? React.Fragment : errorBoundaryProp ?? ErrorBoundary

  return (
    <AdminContext {...coreProps}>
      <AppErrorBoundary>
        <AdminRouter
          layout={AppLayout}
          loginPage={loginPage}
          autoScrollToTop={autoScrollToTop}
        >
          {children}
        </AdminRouter>
      </AppErrorBoundary>
    </AdminContext>
  )
}
