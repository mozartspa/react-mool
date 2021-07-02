import { EuiFormRow } from "@elastic/eui"
import { Field, FieldComponentProps, FieldRenderProps } from "@mozartspa/mobx-form"
import { ReactNode } from "react"

function defaultLabel(name: string) {
  const label = name
    .substring(name.lastIndexOf(".") + 1)
    .replace(/-/gi, " ")
    .replace(/_/gi, " ")
    .replace(/\./gi, " ")

  return label.charAt(0).toUpperCase() + label.substring(1)
}

export type InputProps = FieldComponentProps & {
  label?: string | false
}

export type FieldInputProps = InputProps & {
  children: (props: FieldRenderProps) => ReactNode
}

export const FieldInput = (props: FieldInputProps) => {
  const { label, children, ...fieldOptions } = props

  return (
    <Field {...fieldOptions}>
      {(field) => {
        const content = <>{children(field)}</>
        if (label === false) {
          return content
        } else {
          const isInvalid = field.isTouched && !field.isValid
          const errors = isInvalid ? field.errors : undefined
          const inputLabel = label || defaultLabel(field.name)
          return (
            <EuiFormRow label={inputLabel} isInvalid={isInvalid} error={errors}>
              {content}
            </EuiFormRow>
          )
        }
      }}
    </Field>
  )
}
