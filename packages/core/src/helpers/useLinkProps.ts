import { MouseEvent, useCallback } from "react"
import { useHistory } from "react-router"

const isModifiedEvent = (event: MouseEvent) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

const isLeftClickEvent = (event: MouseEvent) => event.button === 0

const isTargetBlank = (event: MouseEvent<HTMLAnchorElement>) => {
  const evTarget = event.target as any
  const target = evTarget.getAttribute ? evTarget.getAttribute("target") : ""
  return target && target !== "_self"
}

export const useLinkProps = () => {
  const history = useHistory()

  const generator = useCallback(
    (to: string) => {
      const href = history.createHref({ pathname: to })
      const onClick = (event: any) => {
        if (event.defaultPrevented) {
          return
        }

        // Let the browser handle links that open new tabs/windows
        if (isModifiedEvent(event) || !isLeftClickEvent(event) || isTargetBlank(event)) {
          return
        }

        // Prevent regular link behavior, which causes a browser refresh.
        event.preventDefault()

        // Push the route to the history.
        history.push(to)
      }

      return {
        href,
        onClick,
      }
    },
    [history]
  )

  return generator
}

export type UseLinkPropsResult = ReturnType<typeof useLinkProps>
