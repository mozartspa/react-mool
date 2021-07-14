import React, { useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import { ResourceDefinition, useResourceDefinitionsContext } from "./definitions"

export type ResourceContextValue = string

export const ResourceContext = React.createContext<ResourceContextValue | undefined>(
  undefined
)

export function useResource(resource?: ResourceContextValue) {
  const context = React.useContext(ResourceContext)
  const result = resource || context

  if (!result) {
    throw new Error(`ResourceContext not found.`)
  }

  return result
}

export type ResourceProps = ResourceDefinition

export const Resource = (props: ResourceProps) => {
  const { name, create, edit, detail, list } = props

  const context = useResourceDefinitionsContext()

  // Register resource definition into context
  useEffect(() => {
    context.add({ name, create, edit, list })
    return () => context.remove(name)
  }, [name, create, edit, detail, list])

  return (
    <ResourceContext.Provider value={name}>
      <Switch>
        {!!create && <Route path={`/${name}/create`} component={create} />}
        {!!edit && <Route path={`/${name}/:id/edit`} component={edit} />}
        {!!detail && <Route path={`/${name}/:id`} component={detail} />}
        {!!list && <Route path={`/${name}`} component={list} />}
      </Switch>
    </ResourceContext.Provider>
  )
}
