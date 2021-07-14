import { LoginForm, LoginFormProps } from "./LoginForm"
import { LoginLayout } from "./LoginLayout"

export type LoginProps = LoginFormProps

export const Login = (props: LoginProps) => {
  return (
    <LoginLayout>
      <LoginForm {...props} />
    </LoginLayout>
  )
}
