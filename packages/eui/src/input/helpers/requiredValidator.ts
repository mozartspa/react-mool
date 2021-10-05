import { FieldValidate } from "@mozartspa/mobx-form"
import { t } from "../../i18n"

export const requiredValidator: FieldValidate = (value: any) => {
  return value == null ? t.eui.validation.required : undefined
}
