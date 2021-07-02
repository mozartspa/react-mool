import React from "react"

export type ResourceContextValue = string

export const ResourceContext =
  React.createContext<ResourceContextValue | undefined>(undefined)

export function useResource(resource?: ResourceContextValue) {
  const context = React.useContext(ResourceContext)
  const result = resource || context

  if (!result) {
    throw new Error(`ResourceContext not found.`)
  }

  return result
}

// TODO: <Resource />
