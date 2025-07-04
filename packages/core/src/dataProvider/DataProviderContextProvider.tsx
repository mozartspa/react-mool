import { ReactNode, useMemo } from "react"
import { AuthContextValue, useAuthContext } from "../auth"
import { UnauthorizedError } from "../errors"
import { DataProvider, DataProviderContext, PartialDataProvider } from "./dataProvider"

function withUnauthorizedHandler<TRecord, TCreate, TUpdate, TFilter>(
  dataProvider: PartialDataProvider<TRecord, TCreate, TUpdate, TFilter>,
  authRefresh: AuthContextValue["refresh"]
) {
  function wrap<TInput extends Array<any>, TOutput>(
    func: (...input: TInput) => Promise<TOutput>
  ) {
    return async (...input: TInput) => {
      try {
        return await func(...input)
      } catch (error) {
        // In case of UnauthorizedError,
        // try to refresh the auth identity
        if (error instanceof UnauthorizedError) {
          try {
            await authRefresh()
          } catch (authError) {
            // Refresh failed, not a problem, we gave it a chance.
          }
        }

        throw error
      }
    }
  }

  const wrapped: DataProvider<TRecord, TCreate, TUpdate, TFilter> = {
    id: dataProvider.id,
    getOne: wrap(dataProvider.getOne),
    getList: wrap(dataProvider.getList),
    getListForOptions: wrap(dataProvider.getListForOptions ?? dataProvider.getList),
    create: wrap(dataProvider.create),
    update: wrap(dataProvider.update),
    delete: wrap(dataProvider.delete),
  }

  return wrapped
}

export type DataProviderContextProviderProps = {
  dataProvider: PartialDataProvider
  children?: ReactNode
}

export const DataProviderContextProvider = (props: DataProviderContextProviderProps) => {
  const { dataProvider, children } = props

  const authContext = useAuthContext()

  const context = useMemo(() => {
    return withUnauthorizedHandler(dataProvider, authContext.refresh)
  }, [dataProvider, authContext.refresh])

  return <DataProviderContext.Provider value={context} children={children} />
}
