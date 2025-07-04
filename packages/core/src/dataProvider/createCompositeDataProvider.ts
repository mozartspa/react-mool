import { DataProvider, PartialDataProvider } from "./dataProvider"

export type CompositeDataProviderConfig = {
  resources: Record<string, Partial<PartialDataProvider>>
  fallback?: PartialDataProvider
}

export function createCompositeDataProvider(
  config: CompositeDataProviderConfig
): DataProvider {
  const { resources } = config

  const fallback: DataProvider = {
    id: () => {
      throw new Error("Not implemented")
    },
    create: () => {
      throw new Error("Not implemented")
    },
    delete: () => {
      throw new Error("Not implemented")
    },
    getList: () => {
      throw new Error("Not implemented")
    },
    getListForOptions: () => {
      throw new Error("Not implemented")
    },
    getOne: () => {
      throw new Error("Not implemented")
    },
    update: () => {
      throw new Error("Not implemented")
    },
    ...config.fallback,
  }

  const provider: DataProvider = {
    id: (resource, record) => {
      const func = resources[resource]?.id ?? fallback.id
      return func(resource, record)
    },

    getOne: (resource, params) => {
      const func = resources[resource]?.getOne ?? fallback.getOne
      return func(resource, params)
    },

    getList: (resource, params) => {
      const func = resources[resource]?.getList ?? fallback.getList
      return func(resource, params)
    },

    getListForOptions: (resource, params) => {
      const func =
        resources[resource]?.getListForOptions ??
        resources[resource]?.getList ??
        fallback.getListForOptions ??
        fallback.getList

      return func(resource, params)
    },

    create: (resource, params) => {
      const func = resources[resource]?.create ?? fallback.create
      return func(resource, params)
    },

    update: (resource, params) => {
      const func = resources[resource]?.update ?? fallback.update
      return func(resource, params)
    },

    delete: (resource, params) => {
      const func = resources[resource]?.delete ?? fallback.delete
      return func(resource, params)
    },
  }

  return provider
}
