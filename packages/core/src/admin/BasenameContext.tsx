import React, { ReactNode } from "react"

export type BasenameContextValue = string | undefined

export const BasenameContext = React.createContext<BasenameContextValue>(undefined)

export const useBasename = () => {
  return React.useContext(BasenameContext)
}

export type BasenameContextProviderProps = {
  basename: string | undefined
  children?: ReactNode
}

export const BasenameContextProvider = (props: BasenameContextProviderProps) => {
  const { basename, children } = props

  return <BasenameContext.Provider value={basename}>{children}</BasenameContext.Provider>
}
