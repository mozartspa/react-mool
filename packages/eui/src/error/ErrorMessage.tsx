import { FieldError } from "@mozartspa/mobx-form"
import { useTranslate } from "@react-mool/core"

export type ErrorMessageProps = {
  error: FieldError | undefined
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  const { error } = props

  const translate = useTranslate()

  if (!error) {
    return null
  }

  return <>{translate(error.message, { ...error.args })}</>
}
