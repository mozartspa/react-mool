import {
  DebugForm,
  Form,
  FormConfig,
  FormContext,
  FormErrorsInput,
  FormValues,
  useForm,
} from "@mozartspa/mobx-form"
import { Observer, observer } from "mobx-react-lite"
import React, { ReactElement, ReactNode } from "react"
import { UseMutationResult } from "react-query"
import { useCreate, useResourceDataProvider } from "../dataProvider"
import { ValidationError } from "../errors"
import { t } from "../i18n"
import { useNotify } from "../notify"
import { RedirectToOptions, RedirectToPage, useRedirect } from "../redirect"
import { ResourceContext, useResource, useResourceDefinition } from "../resource"
import { CrudModeProvider } from "./crudMode"
import { getRedirectTo, getSuccessMessage } from "./helpers"
import { SaveErrorHandler, SaveSuccessHandler } from "./types"

export type UseCreateFormOptions<TRecord = any, TCreate = TRecord> = Partial<
  Omit<FormConfig<TCreate>, "initialValues">
> & {
  resource?: string
  initialValues?: TCreate
  transform?: (values: TCreate) => any
  redirectTo?:
    | RedirectToPage
    | { to: RedirectToPage; options?: RedirectToOptions }
    | false
  successMessage?: ReactNode | ((record: TRecord) => ReactNode)
  resetAfterSave?: boolean
  onSaveSuccess?: SaveSuccessHandler<TRecord, TCreate>
  onSaveError?: SaveErrorHandler<TRecord, TCreate>
  onBeforeSubmit?: (values: TCreate) => Promise<boolean> | boolean
}

export type UseCreateFormResult<TRecord = any, TCreate = TRecord> = {
  resource: string
  isSaving: boolean
  isSaved: boolean
  form: Form<TCreate>
  mutation: UseMutationResult<TRecord, unknown, TCreate>
}

export function useCreateForm<
  TRecord extends FormValues = any,
  TCreate extends FormValues = TRecord
>(
  options: UseCreateFormOptions<TRecord, TCreate> = {}
): UseCreateFormResult<TRecord, TCreate> {
  const {
    resource: resourceOpt,
    initialValues,
    transform,
    redirectTo,
    successMessage,
    resetAfterSave = true,
    onSaveSuccess,
    onSaveError,
    onBeforeSubmit,
    ...formOptions
  } = options

  const resource = useResource(resourceOpt)
  const resourceDef = useResourceDefinition(resource)
  const dataProvider = useResourceDataProvider(resource)
  const mutation = useCreate<TRecord, TCreate>({ resource })
  const redirect = useRedirect({ resource })
  const notify = useNotify()

  const handleSubmit = async (values: TCreate): Promise<FormErrorsInput | void> => {
    try {
      if (onBeforeSubmit) {
        if (!(await onBeforeSubmit(values))) {
          return undefined
        }
      }

      // mutate
      const data = transform?.(values) ?? values
      const record = await mutation.mutateAsync(data)
      const id = dataProvider.id(record)

      // Reset form values with current values
      if (resetAfterSave) {
        form.reset(values)
      }

      // default handler
      const handleSuccess = async () => {
        const message = getSuccessMessage(successMessage, record, t.core.crud.created)
        notify(message, { type: "success" })

        const defaultRedirectTo = resourceDef.detail
          ? "detail"
          : resourceDef.edit
          ? "edit"
          : "list"

        const redirectArgs = getRedirectTo(redirectTo ?? defaultRedirectTo)

        if (redirectArgs) {
          redirect(redirectArgs.to, {
            id,
            resource: resource,
            ...redirectArgs.options,
          })
        }
      }

      // call custom handler, if any, or the default handler
      if (onSaveSuccess) {
        await onSaveSuccess({ id, record, form }, handleSuccess)
      } else {
        await handleSuccess()
      }

      // no errors returned
      return undefined
    } catch (error) {
      // catch validation errors
      if (error instanceof ValidationError) {
        notify(t.core.crud.invalid_form, { type: "danger" })
        return error.validationErrors
      }

      // default handler
      const handleError = async () => {
        const message = error instanceof Error ? error.message : String(error)
        notify(message, { type: "danger" })
      }

      // call custom handler, if any, or the default handler
      if (onSaveError) {
        return await onSaveError({ form, error }, handleError)
      } else {
        return await handleError()
      }
    }
  }

  const handleFailedSubmit = () => {
    notify(t.core.crud.invalid_form, { type: "danger" })
  }

  const form = useForm<TCreate>({
    initialValues,
    onSubmit: handleSubmit,
    onFailedSubmit: handleFailedSubmit,
    ...formOptions,
  })

  return {
    resource,
    isSaving: mutation.isLoading,
    isSaved: mutation.isSuccess,
    form,
    mutation,
  }
}

export const CreateFormContext = React.createContext<UseCreateFormResult | undefined>(
  undefined
)

export function useCreateFormContext<TRecord = any, TCreate = TRecord>() {
  const context = React.useContext<UseCreateFormResult<TRecord, TCreate> | undefined>(
    CreateFormContext
  )
  if (!context) {
    throw new Error(`CreateFormContext not found.`)
  }
  return context
}

export type CreateBaseProps<TRecord = any, TCreate = TRecord> = UseCreateFormOptions<
  TRecord,
  TCreate
> & {
  children: ReactNode | ((create: UseCreateFormResult<TRecord, TCreate>) => ReactElement)
  debugForm?: boolean
  wrapWithForm?: boolean
  formProps?: (
    create: UseCreateFormResult<TRecord, TCreate>
  ) => React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
}

export const CreateBase = observer((options: CreateBaseProps) => {
  const {
    children,
    debugForm,
    wrapWithForm = true,
    formProps,
    ...createOptions
  } = options
  const create = useCreateForm(createOptions)

  const body =
    children instanceof Function ? (
      <Observer>{() => children(create)}</Observer>
    ) : (
      children
    )

  const content = (
    <>
      {body}
      {!!debugForm && <DebugForm />}
    </>
  )

  const formElement = wrapWithForm ? (
    <form onSubmit={create.form.handleSubmit} {...(formProps?.(create) ?? {})}>
      {content}
    </form>
  ) : (
    content
  )

  return (
    <ResourceContext.Provider value={create.resource}>
      <CrudModeProvider mode="create">
        <CreateFormContext.Provider value={create}>
          <FormContext.Provider value={create.form}>{formElement}</FormContext.Provider>
        </CreateFormContext.Provider>
      </CrudModeProvider>
    </ResourceContext.Provider>
  )
})
