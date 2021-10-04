import { FieldValidate } from "@mozartspa/mobx-form"

export function composeValidate<T = any, Values = any>(
  ...validates: (FieldValidate<T, Values> | undefined)[]
) {
  const validators = validates.filter(Boolean)

  if (validators.length === 0) {
    return undefined
  }

  const composed: FieldValidate<T, Values> = async (value, values) => {
    for (const validate of validators) {
      const error = await validate?.(value, values)
      if (error != null) {
        return error
      }
    }

    return undefined
  }

  return composed
}
