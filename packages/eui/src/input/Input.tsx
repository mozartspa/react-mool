import { EuiFormRow } from "@elastic/eui"
import { Field, FieldComponentProps, FieldRenderProps } from "@mozartspa/mobx-form"
import { ReactNode } from "react"
import { useGetResourceFieldLabel } from "../helpers"

export type InputProps = FieldComponentProps & {
  label?: string | false
  fullWidth?: boolean
  helpText?: ReactNode | ReactNode[]
}

export type InputComponentProps = InputProps & {
  children: (props: FieldRenderProps) => ReactNode
}

export const Input = (props: InputComponentProps) => {
  const { label, fullWidth, helpText, children, ...fieldOptions } = props

  const getFieldLabel = useGetResourceFieldLabel()

  return (
    <Field {...fieldOptions}>
      {(field) => {
        const content = <>{children(field)}</>
        if (label === false) {
          return content
        } else {
          const isInvalid = field.isTouched && !field.isValid
          const errors = isInvalid ? field.errors : undefined
          const inputLabel = label ?? getFieldLabel(field.name)
          return (
            <EuiFormRow
              label={inputLabel}
              isInvalid={isInvalid}
              error={errors}
              fullWidth={fullWidth}
              helpText={helpText}
            >
              {content}
            </EuiFormRow>
          )
        }
      }}
    </Field>
  )
}
