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

export type ShowForCrudProps = {
  modes: CrudModeValue[]
  children?: ReactNode
}

export const ShowForCrud = (props: ShowForCrudProps) => {
  const { modes, children } = props

  const mode = useCrudMode()

  if (modes.includes(mode)) {
    return <>{children}</>
  } else {
    return null
  }
}

export type HideForCrudProps = {
  modes: CrudModeValue[]
  children?: ReactNode
}

export const HideForCrud = (props: HideForCrudProps) => {
  const { modes, children } = props

  const mode = useCrudMode()

  if (modes.includes(mode)) {
    return null
  } else {
    return <>{children}</>
  }
}
