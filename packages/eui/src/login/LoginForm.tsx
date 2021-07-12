import {
  EuiButton,
  EuiCallOut,
  EuiFieldPassword,
  EuiFieldText,
  EuiFormRow,
  EuiSpacer,
} from "@elastic/eui"
import { Field, useForm } from "@mozartspa/mobx-form"
import { useAuthContext, ValidationError } from "@react-mool/core"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router"

export type LoginFormProps = {
  initialValues?: {
    username: string
    password: string
  }
}

export const LoginForm = observer((props: LoginFormProps) => {
  const {
    initialValues = {
      username: "",
      password: "",
      rememberMe: false,
    },
  } = props

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

  const isFormEmpty = form.values.username === "" || form.values.password === ""

  return (
    <form.Form style={{ textAlign: "left" }}>
      <Field name="username">
        {(field) => (
          <EuiFormRow
            label="Username"
            isInvalid={field.isTouched && !field.isValid}
            error={field.isTouched && field.errors}
          >
            <EuiFieldText {...field.input} icon="user" />
          </EuiFormRow>
        )}
      </Field>
      <Field name="password">
        {(field) => (
          <EuiFormRow
            label="Password"
            isInvalid={field.isTouched && !field.isValid}
            error={field.isTouched && field.errors}
          >
            <EuiFieldPassword {...field.input} type="dual" />
          </EuiFormRow>
        )}
      </Field>
      <EuiSpacer />
      {form.getFieldError("*") ? (
        <>
          <EuiCallOut title={form.getFieldError("*")} color="danger" iconType="alert" />
          <EuiSpacer />
        </>
      ) : null}
      <EuiButton
        type="submit"
        fill
        fullWidth
        disabled={isFormEmpty}
        isLoading={form.isSubmitting}
      >
        Log in
      </EuiButton>
    </form.Form>
  )
})
