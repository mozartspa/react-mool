import "@elastic/eui/dist/eui_theme_amsterdam_light.css"
import {
  AdminContext,
  AdminContextProps,
  AdminRouter,
  AdminRouterProps,
  I18nProvider,
} from "@react-mool/core"
import React from "react"
import smoothscroll from "smoothscroll-polyfill"
import "./Admin.css"
import { ErrorBoundary, ErrorBoundaryProps } from "./error"
import { Layout } from "./layout/Layout"
import { Login } from "./login"

// apply smoothscroll polyfill
smoothscroll.polyfill()

export type AdminProps = AdminContextProps &
  AdminRouterProps & {
    errorBoundary?: false | React.ComponentType<{ i18nProvider?: I18nProvider }>
    errorBoundaryProps?: ErrorBoundaryProps
  }

export const Admin = (props: AdminProps) => {
  const {
    layout,
    children,
    loginPage = Login,
    autoScrollToTop,
    errorBoundary: errorBoundaryComp,
    errorBoundaryProps,
    ...coreProps
  } = props

  const AppLayout = layout ?? Layout
  const AppErrorBoundary =
    errorBoundaryComp === false ? React.Fragment : errorBoundaryComp ?? ErrorBoundary

  return (
    <AppErrorBoundary i18nProvider={coreProps.i18nProvider} {...errorBoundaryProps}>
      <AdminContext {...coreProps}>
        <AdminRouter
          layout={AppLayout}
          loginPage={loginPage}
          autoScrollToTop={autoScrollToTop}
        >
          {children}
        </AdminRouter>
      </AdminContext>
    </AppErrorBoundary>
  )
}
