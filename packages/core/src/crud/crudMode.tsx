import React, { ReactNode } from "react"

export type CrudModeValue = "create" | "detail" | "edit" | "list"

export const CrudModeContext = React.createContext<CrudModeValue | undefined>(undefined)

export function useCrudMode() {
  const context = React.useContext(CrudModeContext)
  if (!context) {
    throw new Error(`CrudModeContext not found.`)
  }
  return context
}

export type CrudModeProviderProps = {
  mode: CrudModeValue
  children?: ReactNode
}

export const CrudModeProvider = (props: CrudModeProviderProps) => {
  const { mode, children } = props

  return <CrudModeContext.Provider value={mode} children={children} />
}
