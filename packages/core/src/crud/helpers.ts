import { ReactNode } from "react"
import { RedirectToOptions, RedirectToPage } from "../redirect"

export function getSuccessMessage(
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

export function getRedirectTo(
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
