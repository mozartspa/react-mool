import { FormErrors } from "@mozartspa/mobx-form"

export class ValidationError extends Error {
  constructor(public validationErrors: FormErrors, message = "Validation errors.") {
    super(message)
  }
}
