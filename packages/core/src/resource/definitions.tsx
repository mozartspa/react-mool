import React, {
  ComponentType,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react"

export type ResourceDefinition = {
  name: string
  create?: ComponentType
  edit?: ComponentType
  detail?: ComponentType
  list?: ComponentType
  icon?: ReactElement
}

export type ResourceDefinitionsContextValue = {
  definitions: ResourceDefinition[]
  add: (definition: ResourceDefinition) => void
  remove: (resourceName: string) => void
}

export function useResourceDefinitionsContextProvider(): ResourceDefinitionsContextValue {
  const [definitions, setDefinitions] = useState([] as ResourceDefinition[])

  const add = useCallback(
    (definition: ResourceDefinition) => {
      setDefinitions((value) => {
        if (value.find((o) => o.name === definition.name)) {
          return value
        } else {
          return [...value, definition]
        }
      })
    },
    [setDefinitions]
  )

  const remove = useCallback(
    (name: string) => {
      setDefinitions((value) => {
        return value.filter((o) => o.name !== name)
      })
    },
    [setDefinitions]
  )

  const context = useMemo(
    () => ({
      definitions,
      add,
      remove,
    }),
    [definitions, add, remove]
  )

  return context
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

export function useResourceDefinition(resourceName: string) {
  const list = useResourceDefinitionList()
  const def = list.find((o) => o.name === resourceName)
  if (!def) {
    throw new Error(`Resource definition not found for "${resourceName}".`)
  }
  return def
}

export type ResourceDefinitionsContextProviderProps = {
  children?: ReactNode
}

export const ResourceDefinitionsContextProvider = (
  props: ResourceDefinitionsContextProviderProps
) => {
  const { children } = props

  const context = useResourceDefinitionsContextProvider()

  return <ResourceDefinitionsContext.Provider value={context} children={children} />
}
