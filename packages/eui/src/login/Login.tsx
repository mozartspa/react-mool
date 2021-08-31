import { useIsAuthenticated } from "@react-mool/core"
import { Redirect } from "react-router"
import { LoginForm, LoginFormProps } from "./LoginForm"
import { LoginLayout } from "./LoginLayout"

export type LoginProps = LoginFormProps

export const Login = (props: LoginProps) => {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <LoginLayout>
      <LoginForm {...props} />
    </LoginLayout>
  )
}
