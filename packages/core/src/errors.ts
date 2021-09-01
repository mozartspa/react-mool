import { FormErrors } from "@mozartspa/mobx-form"

export class ValidationError extends Error {
  constructor(public validationErrors: FormErrors, message = "Validation errors.") {
    super(message)
    // HACK: https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized error") {
    super(message)
    // HACK: https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}
