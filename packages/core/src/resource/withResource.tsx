import React from "react"
import { ResourceContextProvider } from "./resource"

export function withResource(resource: string) {
  return <TProps extends any>(Component: React.ComponentType<TProps>) => {
    const displayName = Component.displayName || Component.name || "Component"

    const Wrapped = (props: TProps) => {
      return (
        <ResourceContextProvider resource={resource}>
          <Component {...(props as any)} />
        </ResourceContextProvider>
      )
    }

    Wrapped.displayName = `withResource(${displayName})`

    return Wrapped
  }
}
