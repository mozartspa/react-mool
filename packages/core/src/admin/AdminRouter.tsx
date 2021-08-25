import React, { ComponentType, ReactNode } from "react"
import { Route, Switch } from "react-router-dom"
import { Authenticated } from "../auth"
import { ResourceRoutes, useResourceDefinitionList } from "../resource"
import { ScrollToTop } from "./ScrollToTop"

export type AdminRouterProps = {
  layout?: ComponentType
  loginPage?: ReactNode
  autoScrollToTop?: boolean
  children?: ReactNode
}

export const AdminRouter = (props: AdminRouterProps) => {
  const { layout, loginPage, autoScrollToTop = true, children } = props

  const resourceDefinitions = useResourceDefinitionList()

  const Layout = layout ?? React.Fragment

  return (
    <>
      {!!autoScrollToTop && <ScrollToTop />}
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
    </>
  )
}
