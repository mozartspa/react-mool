import {
  Form,
  FormConfig,
  FormContext,
  FormErrors,
  useForm,
  UseFormResult,
} from "@mozartspa/mobx-form"
import { Observer, observer } from "mobx-react-lite"
import React, { ReactElement, ReactNode, useMemo } from "react"
import { UseMutationResult, UseQueryResult } from "react-query"
import { useParams } from "react-router-dom"
import { RecordID, UpdateParams, useGetOne, useUpdate } from "../dataProvider"
import { ValidationError } from "../errors"
import { useReinitFormOnce } from "../helpers/useReinitFormOnce"
import { useNotify } from "../notify"
import { RecordContextProvider } from "../record"
import { RedirectToOptions, RedirectToPage, useRedirect } from "../redirect"
import { ResourceContext, useResource } from "../resource"

function getInitialValues<TRecord = any, TUpdate = TRecord>(
  initialValues: ((record: TRecord) => TUpdate) | undefined,
  record: TRecord | undefined
): TUpdate {
  if (initialValues == null) {
    return record as unknown as TUpdate
  } else if (record != null) {
    return initialValues(record)
  } else {
    return record as unknown as TUpdate
  }
}

function getSuccessMessage(
  message: ReactNode | ((record: any) => ReactNode) | undefined,
  record: any,
  defaultMessage: ReactNode
) {
  if (message instanceof Function) {
    return message(record) || defaultMessage
  } else {
    return message || defaultMessage
  }
}

function getRedirectTo(
  to: RedirectToPage | { to: RedirectToPage; options?: RedirectToOptions } | false
) {
  if (to === false) {
    return false
  } else if (typeof to === "string") {
    return { to }
  } else {
    return to
  }
}

export type SaveSuccessHandler<TRecord = any, TUpdate = TRecord> = (
  arg: {
    id: RecordID
    record: TRecord
    form: Form<TUpdate>
  },
  defaultHandler: () => Promise<void>
) => Promise<void> | void

export type SaveErrorHandler<TRecord = any, TUpdate = TRecord> = (
  arg: {
    id: RecordID
    record: TRecord
    form: Form<TUpdate>
    error: any
  },
  defaultHandler: () => Promise<void>
) => Promise<FormErrors | void> | FormErrors | void

export type LoadSuccessHandler<TRecord = any> = (arg: {
  id: RecordID
  record: TRecord
}) => void

export type LoadErrorHandler = (
  arg: {
    id: RecordID
    error: any
  },
  defaultHandler: () => void
) => void

export type UseEditFormOptions<TRecord = any, TUpdate = TRecord> = Partial<
  Omit<FormConfig<TUpdate>, "initialValues">
> & {
  id?: RecordID
  resource?: string
  initialValues?: (record: TRecord) => TUpdate
  transform?: (values: TUpdate) => any
  redirectTo?:
    | RedirectToPage
    | { to: RedirectToPage; options?: RedirectToOptions }
    | false
  successMessage?: ReactNode | ((record: TRecord) => ReactNode)
  onSaveSuccess?: SaveSuccessHandler<TRecord, TUpdate>
  onSaveError?: SaveErrorHandler<TRecord, TUpdate>
  onLoadSuccess?: LoadSuccessHandler<TRecord>
  onLoadError?: LoadErrorHandler
}

export type UseEditFormResult<TRecord = any, TUpdate = TRecord> = {
  id: RecordID
  resource: string
  record: TRecord | undefined
  isLoading: boolean
  isLoaded: boolean
  isSaving: boolean
  form: UseFormResult<TUpdate>
  query: UseQueryResult<TRecord>
  mutation: UseMutationResult<TRecord, unknown, UpdateParams<TUpdate>>
}

export function useEditForm<TRecord = any, TUpdate = any>(
  options: UseEditFormOptions<TRecord, TUpdate> = {}
) {
  const {
    id: idOpt,
    resource: resourceOpt,
    initialValues: initialValuesOpt,
    transform,
    redirectTo,
    successMessage,
    onSaveSuccess,
    onSaveError,
    onLoadSuccess,
    onLoadError,
    ...formOptions
  } = options

  const resource = useResource(resourceOpt)
  const { id: idParam } = useParams<{ id: string }>()
  const id = idOpt || idParam

  const mutation = useUpdate<TRecord, TUpdate>({ resource })
  const redirect = useRedirect({ resource })
  const notify = useNotify()

  const query = useGetOne<TRecord>(id, {
    resource,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (record) => {
      onLoadSuccess?.({ id, record })
    },
    onError: (error) => {
      // default handler
      const handleError = () => {
        notify("Element does not exist", { type: "danger" })
        redirect("list", { resource })
      }

      // call custom handler, if any, or the default handler
      if (onLoadError) {
        onLoadError({ id, error }, handleError)
      } else {
        handleError()
      }
    },
  })

  const handleSubmit = async (values: TUpdate): Promise<FormErrors | void> => {
    try {
      // mutate
      const data = transform?.(values) ?? values
      const record = await mutation.mutateAsync({ id, data })

      // default handler
      const handleSuccess = async () => {
        const message = getSuccessMessage(successMessage, record, "Element saved")
        notify(message, { type: "success" })

        const redirectArgs = getRedirectTo(redirectTo ?? "list")

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
        notify("The form is not valid. Please check for errors", { type: "danger" })
        return error.validationErrors
      }

      // default handler
      const handleError = async () => {
        const message = error instanceof Error ? error.message : String(error)
        notify(message, { type: "danger" })
      }

      // call custom handler, if any, or the default handler
      if (onSaveError) {
        return await onSaveError({ id, record: query.data!, form, error }, handleError)
      } else {
        return await handleError()
      }
    }
  }

  const initialValues = useMemo(() => getInitialValues(initialValuesOpt, query.data), [])

  const form = useForm<TUpdate>({
    initialValues,
    onSubmit: handleSubmit,
    ...formOptions,
  })

  const { isReady } = useReinitFormOnce({
    form,
    isFetching: query.isFetching,
    record: query.data,
    getValues: (record) => getInitialValues(initialValuesOpt, record),
  })

  return {
    id,
    resource,
    record: query.data,
    isLoading: query.isLoading,
    isLoaded: !query.isLoading && !query.isError,
    isReady,
    isSaving: mutation.isLoading,
    form,
    query,
    mutation,
  }
}

export const EditFormContext = React.createContext<UseEditFormResult | undefined>(
  undefined
)

export function useEditFormContext<TRecord = any, TUpdate = TRecord>() {
  const context = React.useContext<UseEditFormResult<TRecord, TUpdate> | undefined>(
    EditFormContext
  )
  if (!context) {
    throw new Error(`EditFormContext not found.`)
  }
  return context
}

export type EditBaseProps<TRecord = any, TUpdate = TRecord> = UseEditFormOptions<
  TRecord,
  TUpdate
> & {
  children: ReactNode | ((edit: UseEditFormResult<TRecord, TUpdate>) => ReactElement)
}

export const EditBase = observer((options: EditBaseProps) => {
  const { children, ...editOptions } = options
  const edit = useEditForm(editOptions)

  const body =
    children instanceof Function ? <Observer>{() => children(edit)}</Observer> : children

  return (
    <ResourceContext.Provider value={edit.resource}>
      <EditFormContext.Provider value={edit}>
        <RecordContextProvider record={edit.record} id={edit.id}>
          <FormContext.Provider value={edit.form}>{body}</FormContext.Provider>
        </RecordContextProvider>
      </EditFormContext.Provider>
    </ResourceContext.Provider>
  )
})
