import React from "react"

export type ControlContextValue = "input" | "value"

export const ControlContext = React.createContext<ControlContextValue | undefined>(
  undefined
)

export function useControlContext() {
  const context = React.useContext(ControlContext)
  if (!context) {
    throw new Error(`ControlContext not found.`)
  }
  return context
}
