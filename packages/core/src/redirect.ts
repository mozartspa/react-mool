import React, { SyntheticEvent, useCallback } from "react"
import { useHistory } from "react-router-dom"
import { RecordID } from "./dataProvider"
import { warn } from "./helpers/console"
import { useImmediateRef } from "./helpers/useImmediateRef"
import { useLinkProps } from "./helpers/useLinkProps"
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
  event?: SyntheticEvent
}

export function resolveUrl(to: RedirectToPage, options: RedirectToOptions) {
  const { id, resource, params } = options

  const getLocation = () => {
    switch (to) {
      case "list":
        return `/${resource}`
      case "create":
        return `/${resource}/create`
      case "detail":
        if (id == null) {
          warn(
            `Tried to redirect to "detail" page with an undefined ID ("/${resource}/${id}"). Redirect is cancelled.`
          )
          return undefined
        }
        return `/${resource}/${id}`
      case "edit":
        if (id == null) {
          warn(
            `Tried to redirect to "edit" page with an undefined ID ("/${resource}/${id}/edit"). Redirect is cancelled.`
          )
          return undefined
        }
        return `/${resource}/${id}/edit`
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

export function shouldOpenInNewTab(event: SyntheticEvent) {
  const target = event.target as HTMLElement
  const ev = event as React.MouseEvent<any, MouseEvent>
  return (
    ev.button === 1 ||
    ev.metaKey ||
    ev.altKey ||
    ev.ctrlKey ||
    ev.shiftKey ||
    (target && target.getAttribute && target.getAttribute("target") === "_blank")
  )
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
      event,
    } = options

    const url = resolveUrl(to, { id, resource, params })
    if (url) {
      if (event && shouldOpenInNewTab(event)) {
        window.open(url, "_blank")
      } else {
        historyRef.current.push(url)
      }
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

export function useRedirectUrl(options: UseRedirectOptions = {}) {
  const recordContextRef = useImmediateRef(React.useContext(RecordContext))
  const resourceRef = useImmediateRef(useResource(options.resource))

  return useCallback((to: RedirectToPage, options: Partial<RedirectToOptions> = {}) => {
    const {
      id = recordContextRef.current?.id,
      resource = resourceRef.current,
      params,
    } = options

    const url = resolveUrl(to, { id, resource, params })
    if (url == null) {
      throw new Error(`Resolved URL is undefined.`)
    }

    return url
  }, [])
}
