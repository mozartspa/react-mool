import { LocationDescriptor, parsePath } from "history"
import { useLocation } from "react-router"
import { useBasename } from "../admin"

function removeBasenameFromPath(basename: string | undefined, path: string) {
  if (basename == null) {
    return path
  }
  const token = `/${basename}/`
  if (path.startsWith(token)) {
    return "/" + path.slice(token.length)
  } else {
    return path
  }
}

export function useReturnURL() {
  const location = useLocation()
  const basename = useBasename()

  function addReturnURL(url: string, returnUrl?: string): LocationDescriptor {
    const location = parsePath(url)

    if (!returnUrl) {
      returnUrl =
        removeBasenameFromPath(basename, window.location.pathname) +
        window.location.search
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
