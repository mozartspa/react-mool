import { ReactNode } from "react"
import { AuthContext, AuthProvider } from "./auth"
import { useAuthContextProvider } from "./useAuthContextProvider"

export type AuthContextProviderProps = {
  authProvider: AuthProvider
  children?: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const { authProvider, children } = props

  const context = useAuthContextProvider(authProvider)

  return <AuthContext.Provider value={context} children={children} />
}
