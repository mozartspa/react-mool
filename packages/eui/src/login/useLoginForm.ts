import { useForm } from "@mozartspa/mobx-form"
import { useAuthContext, ValidationError } from "@react-mool/core"
import { useHistory } from "react-router-dom"

type LoginValues = {
  username: string
  password: string
  rememberMe: boolean
}

export type UseLoginFormOptions = {
  initialValues?: LoginValues
}

export function useLoginForm(options: UseLoginFormOptions = {}) {
  const {
    initialValues = {
      username: "",
      password: "",
      rememberMe: false,
    },
  } = options

  const auth = useAuthContext()
  const history = useHistory()

  const form = useForm({
    initialValues,
    onSubmit: async (values) => {
      try {
        await auth.login(values)
        history.replace("/")
        return
      } catch (error) {
        if (error instanceof ValidationError) {
          return error.validationErrors
        } else {
          const message =
            error instanceof Error ? error.message : "Credentials not valid."
          return { "*": message }
        }
      }
    },
  })

  return form
}
