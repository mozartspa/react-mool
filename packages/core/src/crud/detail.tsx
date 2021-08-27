import { Observer, observer } from "mobx-react-lite"
import React, { ReactElement, ReactNode } from "react"
import { UseQueryResult } from "react-query"
import { useParams } from "react-router-dom"
import { RecordID, useGetOne } from "../dataProvider"
import { t } from "../i18n"
import { useNotify } from "../notify"
import { RecordContextProvider } from "../record"
import { useRedirect } from "../redirect"
import { ResourceContext, useResource } from "../resource"
import { CrudModeProvider } from "./crudMode"
import { LoadErrorHandler, LoadSuccessHandler } from "./types"

export type UseDetailOptions<TRecord = any> = {
  id?: RecordID
  resource?: string
  onLoadSuccess?: LoadSuccessHandler<TRecord>
  onLoadError?: LoadErrorHandler
}

export type UseDetailResult<TRecord = any> = {
  id: RecordID
  resource: string
  record: TRecord | undefined
  isLoading: boolean
  isLoaded: boolean
  query: UseQueryResult<TRecord>
}

export function useDetail<TRecord = any>(
  options: UseDetailOptions<TRecord> = {}
): UseDetailResult<TRecord> {
  const { id: idOpt, resource: resourceOpt, onLoadSuccess, onLoadError } = options

  const resource = useResource(resourceOpt)
  const { id: idParam } = useParams<{ id: string }>()
  const id = idOpt || idParam

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
        notify(t.core.crud.item_not_found, { type: "danger" })
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

  return {
    id,
    resource,
    record: query.data,
    isLoading: query.isLoading,
    isLoaded: !query.isLoading && !query.isError,
    query,
  }
}

export const DetailContext = React.createContext<UseDetailResult | undefined>(undefined)

export function useDetailContext<TRecord = any>() {
  const context = React.useContext<UseDetailResult<TRecord> | undefined>(DetailContext)
  if (!context) {
    throw new Error(`DetailContext not found.`)
  }
  return context
}

export type DetailBaseProps<TRecord = any> = UseDetailOptions<TRecord> & {
  children: ReactNode | ((detail: UseDetailResult<TRecord>) => ReactElement)
}

export const DetailBase = observer((options: DetailBaseProps) => {
  const { children, ...detailOptions } = options
  const detail = useDetail(detailOptions)

  const body =
    children instanceof Function ? (
      <Observer>{() => children(detail)}</Observer>
    ) : (
      children
    )

  return (
    <ResourceContext.Provider value={detail.resource}>
      <CrudModeProvider mode="detail">
        <DetailContext.Provider value={detail}>
          <RecordContextProvider record={detail.record} id={detail.id}>
            {body}
          </RecordContextProvider>
        </DetailContext.Provider>
      </CrudModeProvider>
    </ResourceContext.Provider>
  )
})
