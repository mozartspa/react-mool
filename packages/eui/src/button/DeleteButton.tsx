import { EuiButton, EuiButtonProps } from "@elastic/eui"
import {
  RecordID,
  RedirectToPage,
  useDataProvider,
  useNotify,
  useRecordId,
  useRedirect,
  useRefresh,
  useResource,
  useTranslate,
} from "@react-mool/core"
import { useCallback } from "react"
import { useConfirmation } from "../confirm"
import { logError } from "../helpers/console"
import { t } from "../i18n"

export type DeleteButtonProps = EuiButtonProps & {
  resource?: string
  id?: RecordID
  redirectTo?: RedirectToPage | false
}

export const DeleteButton = (props: DeleteButtonProps) => {
  const {
    resource: resourceProp,
    id,
    redirectTo = "list",
    children,
    ...buttonProps
  } = props

  const resource = useResource(resourceProp)
  const dataprovider = useDataProvider()
  const recordId = useRecordId()
  const translate = useTranslate()
  const notify = useNotify()
  const refresh = useRefresh()
  const confirm = useConfirmation()
  const redirect = useRedirect()

  const handleDelete = useCallback(async () => {
    if (
      await confirm(translate(t.eui.bulk.delete_confirm, { smart_count: 1 }), {
        confirmLabel: translate(t.eui.action.delete),
        buttonColor: "danger",
      })
    ) {
      const deleteId = id ?? recordId

      dataprovider
        .delete(resource, { id: deleteId })
        .then(() => {
          notify(translate(t.eui.bulk.deleted_items, { smart_count: 1 }), {
            type: "success",
          })
          if (redirectTo !== false) {
            redirect(redirectTo, { resource, id: deleteId })
          }
        })
        .catch((err) => {
          logError(err)
          notify(err instanceof Error ? err.message : translate(t.eui.error.general), {
            type: "danger",
          })
        })
        .finally(() => {
          refresh()
        })
    }
  }, [
    dataprovider,
    resource,
    id,
    recordId,
    redirectTo,
    translate,
    notify,
    refresh,
    confirm,
    redirect,
  ])

  const label = translate(`resources.${resource}.action.delete`, {
    defaultValue: `${translate(t.eui.action.delete)}`,
  })

  return (
    <EuiButton color="danger" onClick={handleDelete} {...buttonProps}>
      {children ?? label}
    </EuiButton>
  )
}
