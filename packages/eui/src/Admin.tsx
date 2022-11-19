import { EuiProvider } from "@elastic/eui"
import "@elastic/eui/dist/eui_theme_light.css"
import { EuiProviderProps } from "@elastic/eui/src/components/provider"
import {
  AdminContext,
  AdminContextProps,
  AdminRouter,
  AdminRouterProps,
  I18nProvider,
} from "@react-mool/core"
import React from "react"
import smoothscroll from "smoothscroll-polyfill"
import "./Admin.scss"
import { ErrorBoundary, ErrorBoundaryProps } from "./error"
import { defaultI18nProvider } from "./i18n/defaultI18nProvider"
import { EuiI18nContextProvider } from "./i18n/EuiI18nContextProvider"
import { Layout } from "./layout/Layout"
import { NotFound } from "./layout/NotFound"
import { Login } from "./login"

// apply smoothscroll polyfill
smoothscroll.polyfill()

const NoErrorBoundary: React.FC = ({ children }) => <>{children}</>

export type AdminProps = AdminContextProps &
  AdminRouterProps & {
    errorBoundary?: false | React.ComponentType<{ i18nProvider?: I18nProvider }>
    errorBoundaryProps?: ErrorBoundaryProps
    euiProviderProps?: EuiProviderProps<"theme">
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
    basename,
    euiProviderProps = { colorMode: "light" },
    ...coreProps
  } = props

  const AppLayout = layout ?? Layout
  const AppErrorBoundary =
    errorBoundaryComp === false ? NoErrorBoundary : errorBoundaryComp ?? ErrorBoundary

  return (
    <EuiProvider {...euiProviderProps}>
      <AppErrorBoundary i18nProvider={i18nProvider} {...errorBoundaryProps}>
        <AdminContext i18nProvider={i18nProvider} {...coreProps}>
          <EuiI18nContextProvider>
            <AdminRouter
              layout={AppLayout}
              loginPage={loginPage}
              dashboard={dashboard}
              customRoutes={customRoutes}
              catchAll={catchAll}
              autoScrollToTop={autoScrollToTop}
              basename={basename}
            >
              {children}
            </AdminRouter>
          </EuiI18nContextProvider>
        </AdminContext>
      </AppErrorBoundary>
    </EuiProvider>
  )
}
