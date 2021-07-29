import React, { ComponentType, ReactNode, useMemo } from "react"
import { AuthPermissions, useAuthPermissions } from "../auth"

export type ResourceDefinition<TRecord = any> = {
  name: string
  create?: ComponentType
  edit?: ComponentType
  detail?: ComponentType
  list?: ComponentType
  icon?: string | ComponentType
  recordName?: (record: TRecord) => string
}

export type ResourceDefinitionsArgs = {
  permissions: AuthPermissions | undefined
}

export type ResourceDefinitions =
  | ResourceDefinition[]
  | ((args: ResourceDefinitionsArgs) => ResourceDefinition[])

export type ResourceDefinitionsContextValue = {
  definitions: ResourceDefinition[]
}

export const ResourceDefinitionsContext = React.createContext<
  ResourceDefinitionsContextValue | undefined
>(undefined)

export function useResourceDefinitionsContext() {
  const context = React.useContext(ResourceDefinitionsContext)
  if (!context) {
    throw new Error(`ResourceDefinitionsContext not found.`)
  }
  return context
}

export function useResourceDefinitionList() {
  return useResourceDefinitionsContext().definitions
}

export function useResourceDefinition(resource: string) {
  const list = useResourceDefinitionList()
  const def = list.find((o) => o.name === resource)
  if (!def) {
    throw new Error(`Resource definition not found for "${resource}".`)
  }
  return def
}

export type ResourceDefinitionsContextProviderProps = {
  definitions: ResourceDefinitions
  children?: ReactNode
}

export const ResourceDefinitionsContextProvider = (
  props: ResourceDefinitionsContextProviderProps
) => {
  const { definitions, children } = props

  const permissions = useAuthPermissions()

  const defs = useMemo(
    () => (definitions instanceof Function ? definitions({ permissions }) : definitions),
    [definitions, permissions]
  )

  const context = useMemo(
    () => ({
      definitions: defs,
    }),
    [defs]
  )

  return <ResourceDefinitionsContext.Provider value={context} children={children} />
}
