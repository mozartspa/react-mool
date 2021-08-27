import React, { ComponentType, ReactElement, ReactNode } from "react"
import { Route, Switch } from "react-router-dom"
import { Authenticated } from "../auth"
import { CustomRouteProps } from "../customRoute"
import { ResourceRoutes, useResourceDefinitionList } from "../resource"
import { ScrollToTop } from "./ScrollToTop"

export type AdminRouterProps = {
  layout?: ComponentType
  loginPage?: ReactNode
  customRoutes?: ReactElement<CustomRouteProps>[]
  catchAll?: ReactNode
  autoScrollToTop?: boolean
  children?: ReactNode
}

export const AdminRouter = (props: AdminRouterProps) => {
  const {
    layout,
    loginPage,
    customRoutes = [],
    catchAll,
    autoScrollToTop = true,
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

  const resourceRoutes = resourceDefinitions.map((def, i) => (
    <Route key={i} path={`/${def.name}`}>
      <ResourceRoutes definition={def} />
    </Route>
  ))

  return (
    <>
      {!!autoScrollToTop && <ScrollToTop />}
      <Switch>
        {customRoutesWithoutLayout}
        {!!loginPage && <Route path="/login">{loginPage}</Route>}
        <Route>
          <Authenticated>
            <Layout>
              <Switch>
                {customRoutesWithLayout}
                {resourceRoutes}
                {!!catchAll && <Route>{catchAll}</Route>}
              </Switch>
              {children}
            </Layout>
          </Authenticated>
        </Route>
      </Switch>
    </>
  )
}
