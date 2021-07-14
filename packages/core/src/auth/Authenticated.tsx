import { ReactNode } from "react"
import { Redirect } from "react-router-dom"
import { useReturnURL } from "../helpers/useReturnURL"
import { useIsAuthenticated } from "./auth"

export type AuthenticatedProps = {
  loginUrl?: string
  children?: ReactNode
}

export const Authenticated = (props: AuthenticatedProps) => {
  const { loginUrl = "/login", children } = props

  const isAuthenticated = useIsAuthenticated()
  const { addReturnURL } = useReturnURL()

  if (!isAuthenticated) {
    const to = addReturnURL(loginUrl)
    return <Redirect to={to} push={false} />
  } else {
    return <>{children}</>
  }
}
