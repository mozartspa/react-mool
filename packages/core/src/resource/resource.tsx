import React from "react"
import { Route, Switch } from "react-router-dom"
import { ResourceDefinition } from "./definitions"

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

export type ResourceProps = {
  definition: ResourceDefinition
}

export const ResourceRoutes = (props: ResourceProps) => {
  const { name, create, edit, detail, list } = props.definition

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
