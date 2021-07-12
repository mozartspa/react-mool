import { ReactNode } from "react"
import { Redirect } from "react-router-dom"
import { useIsAuthenticated } from "./auth"

export type AuthenticatedProps = {
  loginUrl?: string
  children?: ReactNode
}

export const Authenticated = (props: AuthenticatedProps) => {
  const { loginUrl = "/login", children } = props

  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Redirect to={loginUrl} />
  } else {
    return <>{children}</>
  }
}
