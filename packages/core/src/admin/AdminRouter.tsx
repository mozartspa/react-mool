import { ReactNode } from "react"
import { Route, Switch } from "react-router-dom"
import { Authenticated } from "../auth"

export type AdminRouterProps = {
  loginPage?: ReactNode
  children?: ReactNode
}

export const AdminRouter = (props: AdminRouterProps) => {
  const { loginPage, children } = props

  return (
    <Switch>
      {!!loginPage && <Route path="/login">{loginPage}</Route>}
      <Route>
        <Authenticated>{children}</Authenticated>
      </Route>
    </Switch>
  )
}
