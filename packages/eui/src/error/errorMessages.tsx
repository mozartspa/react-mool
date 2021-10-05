import { FieldError } from "@mozartspa/mobx-form"
import { ErrorMessage } from "./ErrorMessage"

export function errorMessages(errors: FieldError[] | undefined) {
  return errors?.map((err, i) => <ErrorMessage key={i} error={err} />)
}
