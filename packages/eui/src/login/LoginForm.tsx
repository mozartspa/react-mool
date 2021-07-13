import {
  EuiButton,
  EuiCallOut,
  EuiFieldPassword,
  EuiFieldText,
  EuiFormRow,
  EuiSpacer,
} from "@elastic/eui"
import { Field, useForm } from "@mozartspa/mobx-form"
import { useAuthContext, useTranslate, ValidationError } from "@react-mool/core"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router"
import { t } from "../i18n"

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
  const translate = useTranslate()

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
            error instanceof Error ? error.message : t.eui.login.invalid_credentials
          return { "*": translate(message) }
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
            label={translate(t.eui.login.username_label)}
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
            label={translate(t.eui.login.password_label)}
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
        {translate(t.eui.login.login_btn)}
      </EuiButton>
    </form.Form>
  )
})
