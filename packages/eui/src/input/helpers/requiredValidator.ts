import { FieldValidate } from "@mozartspa/mobx-form"
import { t } from "../../i18n"

function isEmpty(value: any) {
  return (
    value == null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  )
}

export const requiredValidator: FieldValidate = (value: any) => {
  return isEmpty(value) ? t.eui.validation.required : undefined
}
