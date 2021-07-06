import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import { RecordID } from "./dataProvider"
import { useImmediateRef } from "./helpers/useImmediateRef"
import { useLinkProps } from "./helpers/useLinkProps"
import { warn } from "./helpers/warn"
import { RecordContext } from "./record"
import { useResource } from "./resource"

function encodeQueryString(params: Record<string, string>) {
  return Object.entries(params)
    .map(([name, value]) => {
      return `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    })
    .join("&")
}

export type RedirectToPage = "list" | "create" | "edit" | "detail"

export type RedirectToOptions = {
  id?: RecordID
  resource: string
  params?: Record<string, string>
}

export function resolveUrl(to: RedirectToPage, options: RedirectToOptions) {
  const { id, resource, params } = options

  const getLocation = () => {
    switch (to) {
      case "list":
        return `${resource}/list`
      case "create":
        return `${resource}/create`
      case "detail":
        return `${resource}/${id}`
      case "edit":
        return `${resource}/${id}/edit`
      default: {
        warn(`redirectTo value unknown: ${to}.`)
        return undefined
      }
    }
  }

  const location = getLocation()

  if (!location) {
    return undefined
  } else {
    const url = location + (params ? `?${encodeQueryString(params)}` : "")
    return url
  }
}

export type UseRedirectOptions = {
  resource?: string
}

export function useRedirect(options: UseRedirectOptions = {}) {
  const recordContextRef = useImmediateRef(React.useContext(RecordContext))
  const resourceRef = useImmediateRef(useResource(options.resource))
  const historyRef = useImmediateRef(useHistory())

  return useCallback((to: RedirectToPage, options: Partial<RedirectToOptions> = {}) => {
    const {
      id = recordContextRef.current?.id,
      resource = resourceRef.current,
      params,
    } = options

    const url = resolveUrl(to, { id, resource, params })
    if (url) {
      historyRef.current.push(url)
    }
  }, [])
}

export function useRedirectLink(options: UseRedirectOptions = {}) {
  const recordContextRef = useImmediateRef(React.useContext(RecordContext))
  const resourceRef = useImmediateRef(useResource(options.resource))
  const linkRef = useImmediateRef(useLinkProps())

  return useCallback((to: RedirectToPage, options: Partial<RedirectToOptions> = {}) => {
    const {
      id = recordContextRef.current?.id,
      resource = resourceRef.current,
      params,
    } = options

    const url = resolveUrl(to, { id, resource, params })
    if (url) {
      return linkRef.current(url)
    } else {
      return {
        href: undefined,
        onClick: undefined,
      }
    }
  }, [])
}
