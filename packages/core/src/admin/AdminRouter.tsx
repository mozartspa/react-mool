import React, { ComponentType, ReactNode } from "react"
import { Route, Switch } from "react-router-dom"
import { Authenticated } from "../auth"
import { ResourceRoutes, useResourceDefinitionList } from "../resource"

export type AdminRouterProps = {
  layout?: ComponentType
  loginPage?: ReactNode
  children?: ReactNode
}

export const AdminRouter = (props: AdminRouterProps) => {
  const { layout, loginPage, children } = props

  const resourceDefinitions = useResourceDefinitionList()

  const Layout = layout ?? React.Fragment

  return (
    <Switch>
      {!!loginPage && <Route path="/login">{loginPage}</Route>}
      <Route>
        <Authenticated>
          <Layout>
            {resourceDefinitions.map((def, i) => (
              <ResourceRoutes key={i} definition={def} />
            ))}
            {children}
          </Layout>
        </Authenticated>
      </Route>
    </Switch>
  )
}
