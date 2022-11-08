import React, { ComponentType, ReactElement, ReactNode } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { Authenticated } from "../auth"
import { CustomRouteProps } from "../customRoute"
import {
  ResourceDefinition,
  ResourceRoutes,
  useResourceDefinitionList,
} from "../resource"
import { ScrollToTop } from "./ScrollToTop"

function hasResourceRoutes(definition: ResourceDefinition) {
  const { create, detail, edit, list } = definition

  return create || detail || edit || list ? true : false
}

export type AdminRouterProps = {
  layout?: ComponentType<{ hasDashboard?: boolean }>
  loginPage?: ReactNode
  dashboard?: ReactNode
  dashboardWithoutLayout?: boolean
  customRoutes?: ReactElement<CustomRouteProps>[]
  catchAll?: ReactNode
  autoScrollToTop?: boolean
  basename?: string
  children?: ReactNode
}

export const AdminRouter = (props: AdminRouterProps) => {
  const {
    layout,
    loginPage,
    dashboard,
    dashboardWithoutLayout,
    customRoutes = [],
    catchAll,
    autoScrollToTop = true,
    basename,
    children,
  } = props

  const resourceDefinitions = useResourceDefinitionList()

  const Layout = layout ?? React.Fragment

  const customRoutesWithoutLayout = customRoutes
    .filter((route) => route.props.noLayout === true)
    .map((route, i) => <Route key={i} {...route.props} />)

  const customRoutesWithLayout = customRoutes
    .filter((route) => route.props.noLayout !== true)
    .map((route, i) => <Route key={i} {...route.props} />)

  const resourceRoutes = resourceDefinitions.map(
    (def, i) =>
      hasResourceRoutes(def) && (
        <Route key={i} path={`/${def.name}`}>
          <ResourceRoutes definition={def} />
        </Route>
      )
  )

  const redirectToFirstResource =
    resourceDefinitions.length > 0 ? (
      <Redirect to={`/${resourceDefinitions[0].name}`} />
    ) : null

  const dashboardRoute = (
    <Route path="/" exact>
      {!!dashboard ? dashboard : redirectToFirstResource}
    </Route>
  )

  return (
    <BrowserRouter basename={basename}>
      {children}
      {!!autoScrollToTop && <ScrollToTop />}
      <Switch>
        {customRoutesWithoutLayout}
        {!dashboardWithoutLayout && dashboardRoute}
        {!!loginPage && <Route path="/login">{loginPage}</Route>}
        <Route>
          <Authenticated>
            <Layout hasDashboard={!!dashboard}>
              <Switch>
                {customRoutesWithLayout}
                {!!dashboardWithoutLayout && dashboardRoute}
                {resourceRoutes}
                {!!catchAll && <Route>{catchAll}</Route>}
              </Switch>
              {children}
            </Layout>
          </Authenticated>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
