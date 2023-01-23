import React from "react"
import { UsePreventLeaveResult } from "./usePreventLeave"

export const PreventLeaveContext = React.createContext<UsePreventLeaveResult | undefined>(
  undefined
)

export function usePreventLeaveContext() {
  return React.useContext(PreventLeaveContext)
}
