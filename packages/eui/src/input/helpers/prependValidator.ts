import { FieldValidate } from "@mozartspa/mobx-form"

export function prependValidator(
  validator: FieldValidate,
  original: FieldValidate | FieldValidate[] | undefined
) {
  if (!original) {
    return validator
  } else if (Array.isArray(original)) {
    return [validator, ...original]
  } else {
    return [validator, original]
  }
}
