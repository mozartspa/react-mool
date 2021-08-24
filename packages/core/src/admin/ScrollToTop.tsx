import { Action, Location } from "history"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

function shouldScroll(location: Location<any>, action: Action) {
  if (location.state?._scrollToTop === false) {
    return false
  }

  if (action === "PUSH" || action === "REPLACE") {
    return true
  }

  return false
}

export function ScrollToTop() {
  const history = useHistory()

  useEffect(() => {
    return history.listen((location: Location<any>, action) => {
      if (shouldScroll(location, action)) {
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: location.state?._scrollToTopBehavior,
        })
      }
    })
  }, [history])

  return null
}
