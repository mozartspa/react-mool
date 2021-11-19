import { EuiFormRow } from "@elastic/eui"
import {
  Field,
  FieldComponentProps,
  FieldRenderProps,
  splitFieldProps,
} from "@mozartspa/mobx-form"
import { useTranslate } from "@react-mool/core"
import { ReactNode, useMemo } from "react"
import { errorMessages } from "../error"
import { useGetResourceFieldLabel } from "../helpers"
import { prependValidator } from "./helpers/prependValidator"
import { requiredValidator } from "./helpers/requiredValidator"

type ChildrenProps<T> = Omit<T, keyof InputProps>

export type InputProps = FieldComponentProps & {
  label?: ReactNode | false
  fullWidth?: boolean
  helpText?: ReactNode | ReactNode[]
  required?: boolean
  noFormRow?: boolean
}

export type InputComponentProps<TCustomProps = Object> = InputProps &
  TCustomProps & {
    children: (
      field: FieldRenderProps,
      childrenProps: ChildrenProps<TCustomProps>
    ) => ReactNode
  }

export const Input = <TCustomProps extends Object>(
  props: InputComponentProps<TCustomProps>
) => {
  const { label, fullWidth, helpText, required, noFormRow, children, ...rest } = props

  const [name, fieldOptions, childrenProps] = splitFieldProps(rest)
  const getFieldLabel = useGetResourceFieldLabel()
  const translate = useTranslate()

  const validate = useMemo(() => {
    if (required) {
      return prependValidator(requiredValidator, props.validate)
    } else {
      return props.validate
    }
  }, [props.validate, required])

  return (
    <Field {...fieldOptions} name={name} validate={validate}>
      {(field) => {
        const content = <>{children(field, childrenProps as any /* FIX $TYPE*/)}</>
        if (noFormRow) {
          return content
        } else {
          const inputLabelNode = label ? translate(label) : getFieldLabel(field.name)
          const inputLabel = required ? <>{inputLabelNode} *</> : inputLabelNode
          const isInvalid = field.isTouched && !field.isValid
          const errors = isInvalid ? errorMessages(field.errors) : undefined
          return (
            <EuiFormRow
              label={label === false ? null : inputLabel}
              isInvalid={isInvalid}
              error={errors}
              fullWidth={fullWidth}
              helpText={translate(helpText)}
            >
              {content}
            </EuiFormRow>
          )
        }
      }}
    </Field>
  )
}
