import { EuiButtonIconColor } from "@elastic/eui"
import {
  useDataProvider,
  useNotify,
  useRedirect,
  useRefresh,
  useResource,
  useTranslate,
} from "@react-mool/core"
import { ReactNode, useMemo } from "react"
import { useConfirmation } from "../../confirm"
import { logError } from "../../helpers/console"
import { t } from "../../i18n"

export type DatagridAction<TRecord = any> = {
  name: ReactNode
  run: (items: TRecord[]) => void
  description?: string
  icon?: string
  color?: EuiButtonIconColor
  available?: (item: TRecord) => boolean
  enabled?: (item: TRecord) => boolean
  isPrimary?: boolean
}

export function useDefaultDatagridActions<TRecord = any>() {
  const resource = useResource()
  const translate = useTranslate()
  const notify = useNotify()
  const redirect = useRedirect({ resource })
  const dataprovider = useDataProvider()
  const refresh = useRefresh()
  const confirm = useConfirmation()

  const view: DatagridAction<TRecord> = useMemo(
    () => ({
      name: translate(t.eui.action.view),
      icon: "eye",
      run: (items) => {
        const id = dataprovider.id(resource, items[0])
        redirect("detail", { id })
      },
    }),
    [translate, resource, dataprovider, redirect]
  )

  const edit: DatagridAction<TRecord> = useMemo(
    () => ({
      name: translate(t.eui.action.edit),
      icon: "pencil",
      color: "primary",
      run: (items) => {
        const id = dataprovider.id(resource, items[0])
        redirect("edit", { id })
      },
    }),
    [translate, resource, dataprovider, redirect]
  )

  const remove: DatagridAction<TRecord> = useMemo(
    () => ({
      name: translate(t.eui.action.delete),
      icon: "trash",
      color: "danger",
      run: async (items) => {
        if (
          await confirm(
            translate(t.eui.bulk.delete_confirm, { smart_count: items.length }),
            { confirmLabel: translate(t.eui.action.delete), buttonColor: "danger" }
          )
        ) {
          return Promise.all(
            items.map((item) => {
              const id = dataprovider.id(resource, item)
              return dataprovider.delete(resource, { id })
            })
          )
            .then(() => {
              notify(translate(t.eui.bulk.deleted_items, { smart_count: items.length }), {
                type: "success",
              })
            })
            .catch((err) => {
              logError(err)
              notify(
                err instanceof Error ? err.message : translate(t.eui.error.general),
                {
                  type: "danger",
                }
              )
            })
            .finally(() => {
              refresh()
            })
        }
      },
    }),
    [translate, resource, dataprovider, redirect, refresh]
  )

  return {
    view,
    edit,
    remove,
  }
}
