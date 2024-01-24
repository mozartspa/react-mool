import { useEditFormContext } from "@react-mool/core"
import { ReactNode, useEffect } from "react"
import { focusManager } from "react-query"
import { useFreshRef, useUpdateEffect } from "rooks"
import { ConfirmationOptions, useConfirmation } from "../confirm"
import { t } from "../i18n"

export type UseRefreshEditFormOptions = {
  confirmOptions?: Partial<ConfirmationOptions>
  confirmMessage?: ReactNode
}

export function useRefreshEditForm(options: UseRefreshEditFormOptions = {}) {
  const { confirmMessage = t.eui.refresh.title, confirmOptions } = options

  const { query, form, isReady, record, initialValues, isSaved, isSaving } =
    useEditFormContext()

  const confirm = useConfirmation({
    buttonColor: "danger",
    cancelLabel: t.eui.action.cancel,
    confirmLabel: t.eui.action.update,
    content: t.eui.refresh.content,
    ...confirmOptions,
  })

  // Force query refetch on window focus
  useEffect(() => {
    return focusManager.subscribe(() => {
      if (focusManager.isFocused()) {
        query.refetch()
      }
    })
  }, [query])

  // Keep refs
  const allRefs = useFreshRef({
    form,
    confirm,
    initialValues,
    record,
    confirmMessage,
    isSaved,
    isSaving,
  })

  // Refresh form values when record is changed
  useUpdateEffect(() => {
    const refs = allRefs.current
    if (!refs) {
      return
    }

    const refreshForm = () => {
      const newData = refs.initialValues(refs.record)
      refs.form.reset(newData)
    }

    if (isReady && record && !refs.isSaving) {
      if (refs.form.isDirty) {
        refs.confirm(refs.confirmMessage).then((ok) => {
          if (ok) {
            refreshForm()
          }
        })
      } else {
        refreshForm()
      }
    }
  }, [record, isReady])
}

export type RefreshEditFormProps = UseRefreshEditFormOptions

export const RefreshEditForm = (props: RefreshEditFormProps) => {
  useRefreshEditForm(props)

  return null
}
