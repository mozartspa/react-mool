import { LocationDescriptor, parsePath } from "history"
import { useLocation } from "react-router"

export function useReturnURL() {
  const location = useLocation()

  function addReturnURL(url: string, returnUrl?: string): LocationDescriptor {
    const location = parsePath(url)

    if (!returnUrl) {
      returnUrl = window.location.pathname + window.location.search
    }

    return {
      ...location,
      state: {
        returnUrl,
      },
    }
  }

  function getReturnURL(defaultValue = "/") {
    const { returnUrl } = (location.state || {}) as any
    return returnUrl || defaultValue
  }

  return {
    addReturnURL,
    getReturnURL,
  }
}
