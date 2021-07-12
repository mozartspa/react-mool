import {
  EuiButton,
  EuiFieldPassword,
  EuiFieldText,
  EuiFormRow,
  EuiSpacer,
} from "@elastic/eui"
import { Field } from "@mozartspa/mobx-form"
import { observer } from "mobx-react-lite"
import { useLoginForm, UseLoginFormOptions } from "./useLoginForm"

export type LoginFormProps = UseLoginFormOptions

export const LoginForm = observer((props: LoginFormProps) => {
  const { initialValues } = props
  const form = useLoginForm({ initialValues })

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
