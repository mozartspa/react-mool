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
import { defaultI18nProvider } from "./i18n/defaultI18nProvider"
import { Layout } from "./layout/Layout"
import { NotFound } from "./layout/NotFound"
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
    loginPage = <Login />,
    dashboard,
    customRoutes,
    catchAll = <NotFound />,
    autoScrollToTop,
    errorBoundary: errorBoundaryComp,
    errorBoundaryProps,
    i18nProvider = defaultI18nProvider,
    ...coreProps
  } = props

  const AppLayout = layout ?? Layout
  const AppErrorBoundary =
    errorBoundaryComp === false ? React.Fragment : errorBoundaryComp ?? ErrorBoundary

  return (
    <AppErrorBoundary i18nProvider={i18nProvider} {...errorBoundaryProps}>
      <AdminContext i18nProvider={i18nProvider} {...coreProps}>
        <AdminRouter
          layout={AppLayout}
          loginPage={loginPage}
          dashboard={dashboard}
          customRoutes={customRoutes}
          catchAll={catchAll}
          autoScrollToTop={autoScrollToTop}
        >
          {children}
        </AdminRouter>
      </AdminContext>
    </AppErrorBoundary>
  )
}
