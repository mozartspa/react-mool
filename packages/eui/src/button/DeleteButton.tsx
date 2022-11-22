import {
  EuiButton,
  EuiButtonIcon,
  EuiButtonIconProps,
  EuiButtonProps,
  EuiLoadingSpinner,
} from "@elastic/eui"
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
import { useCallback, useState } from "react"
import { useConfirmation } from "../confirm"
import { logError } from "../helpers/console"
import { useIsMounted } from "../helpers/useIsMounted"
import { t } from "../i18n"
import { BaseButtonProps } from "./BaseButtonProps"

export type DeleteButtonProps = BaseButtonProps & {
  resource?: string
  id?: RecordID
  redirectTo?: RedirectToPage | false
  onSuccess?: () => Promise<void> | void
  onError?: (err: any) => Promise<void> | void
}

export const DeleteButton = (props: DeleteButtonProps) => {
  const {
    resource: resourceProp,
    id,
    redirectTo = "list",
    children,
    asIcon,
    color,
    onSuccess,
    onError,
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

  const isMounted = useIsMounted()
  const [isLoading, setLoading] = useState(false)

  const handleDelete = useCallback(async () => {
    if (
      await confirm(translate(t.eui.bulk.delete_confirm, { smart_count: 1 }), {
        confirmLabel: translate(t.eui.action.delete),
        buttonColor: "danger",
      })
    ) {
      const deleteId = id ?? recordId

      if (isMounted()) {
        setLoading(true)
      }

      dataprovider
        .delete(resource, { id: deleteId })
        .then(async () => {
          notify(translate(t.eui.bulk.deleted_items, { smart_count: 1 }), {
            type: "success",
          })
          if (redirectTo !== false) {
            redirect(redirectTo, { resource, id: deleteId })
          }
          await onSuccess?.()
        })
        .catch(async (err) => {
          logError(err)
          notify(err instanceof Error ? err.message : translate(t.eui.error.general), {
            type: "danger",
          })
          await onError?.(err)
        })
        .finally(() => {
          refresh()
          if (isMounted()) {
            setLoading(false)
          }
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
    onSuccess,
    onError,
  ])

  const label = translate(`resources.${resource}.action.delete`, {
    defaultValue: `${translate(t.eui.action.delete)}`,
  })

  const isBtnLoading = buttonProps.isLoading ?? isLoading
  const iconType = isBtnLoading ? EuiLoadingSpinner : buttonProps.iconType || "trash"

  if (asIcon) {
    return (
      <EuiButtonIcon
        key={isBtnLoading ? 0 : 1}
        color="danger"
        onClick={handleDelete}
        display="base"
        size="m"
        aria-label={label}
        isDisabled={isBtnLoading || buttonProps.isDisabled}
        {...(buttonProps as Partial<EuiButtonIconProps>)}
        iconType={iconType}
      />
    )
  } else {
    return (
      <EuiButton
        color="danger"
        onClick={handleDelete}
        isLoading={isBtnLoading}
        {...(buttonProps as Partial<EuiButtonProps>)}
      >
        {children ?? label}
      </EuiButton>
    )
  }
}
