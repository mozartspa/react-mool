import React from "react"
import { RefreshSignal } from "../helpers/refreshSignal"
import { UseAuthContextProviderResult } from "./useAuthContextProvider"

export type AuthIdentity = {
  displayName?: string
  avatar?: string
  [index: string]: any
}

export type AuthCredentials = {
  username?: string
  password?: string
  [index: string]: any
}

export type AuthPermissions = any

export type AuthState<
  TIdentity extends AuthIdentity = AuthIdentity,
  TPermissions = any
> = {
  identity: TIdentity | undefined
  permissions?: TPermissions | undefined
}

export type AuthProvider<
  TIdentity extends AuthIdentity = AuthIdentity,
  TPermissions = any,
  TCredentials extends AuthCredentials = AuthCredentials
> = {
  login: (credentials: TCredentials) => Promise<AuthState<TIdentity, TPermissions>>
  logout: () => Promise<void>
  refresh: () => Promise<AuthState<TIdentity, TPermissions>>
  getInitialState?: () => AuthState<TIdentity, TPermissions>
  getRefreshSignal?: () => RefreshSignal
}

export type AuthContextValue<
  TIdentity extends AuthIdentity = AuthIdentity,
  TPermissions = any,
  TCredentials extends AuthCredentials = AuthCredentials
> = UseAuthContextProviderResult<TIdentity, TPermissions, TCredentials>

export const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function useAuthContext<
  TIdentity extends AuthIdentity = AuthIdentity,
  TPermissions = any,
  TCredentials extends AuthCredentials = AuthCredentials
>() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(`AuthContext not found.`)
  }
  return context as unknown as AuthContextValue<TIdentity, TPermissions, TCredentials>
}

export function useIsAuthenticated() {
  const { identity } = useAuthContext()
  return identity != null
}

export function useAuthIdentity<TIdentity extends AuthIdentity = AuthIdentity>() {
  const { identity } = useAuthContext()
  return identity as TIdentity | undefined
}

export function useAuthPermissions<TPermissions = any>() {
  const { permissions } = useAuthContext()
  return permissions as TPermissions | undefined
}
