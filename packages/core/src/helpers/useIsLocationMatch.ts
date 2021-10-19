import { parsePath } from "history"
import { parse } from "query-string"
import { useCallback } from "react"
import isEqual from "react-fast-compare"
import { useLocation } from "react-router-dom"

type LocationType = {
  pathname: string
  search: string
}

function removeTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value
}

export type LocationMatchOptions = {
  exact?: boolean
}

export function isLocationMatch(
  location: LocationType,
  url: string,
  options: LocationMatchOptions = {}
) {
  const matchLocation = parsePath(url)

  if (options.exact) {
    const path = removeTrailingSlash(location.pathname)
    const matchPath = removeTrailingSlash(matchLocation.pathname)

    if (path !== matchPath) {
      return false
    }

    // `Object.assign` to fix this:
    // https://github.com/FormidableLabs/react-fast-compare/issues/64
    const query = Object.assign({}, parse(location.search))
    const matchQuery = Object.assign({}, parse(matchLocation.search))

    return isEqual(matchQuery, query)
  } else {
    const path = removeTrailingSlash(location.pathname)
    const matchPath = removeTrailingSlash(matchLocation.pathname)

    if (!(path === matchPath || path.startsWith(`${matchPath}/`))) {
      return false
    }

    const query = parse(location.search)
    const matchQuery = parse(matchLocation.search)

    for (const key in matchQuery) {
      if (!isEqual(matchQuery[key], query[key])) {
        return false
      }
    }

    return true
  }
}

export function useIsLocationMatch() {
  const location = useLocation()

  const isMatch = useCallback(
    (url: string, options?: LocationMatchOptions) => {
      return isLocationMatch(location, url, options)
    },
    [location]
  )

  return isMatch
}
