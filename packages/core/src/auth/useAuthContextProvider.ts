import { useCallback, useEffect, useRef, useState } from "react"
import { UnauthorizedError } from "../errors"
import { useIdGenerator } from "../helpers/useIdGenerator"
import { AuthCredentials, AuthIdentity, AuthProvider, AuthState } from "./auth"

export type UseAuthContextProviderResult<
  TIdentity extends AuthIdentity = AuthIdentity,
  TPermissions = any,
  TCredentials extends AuthCredentials = AuthCredentials
> = {
  authProvider: AuthProvider<TIdentity, TPermissions, TCredentials>
  identity: TIdentity | undefined
  permissions: TPermissions | undefined
  isLoggingIn: boolean
  isLoggingOut: boolean
  isRefreshing: boolean
  login: (credentials: TCredentials) => Promise<AuthState<TIdentity, TPermissions>>
  logout: () => Promise<void>
  refresh: () => Promise<AuthState<TIdentity, TPermissions>>
}

export function useAuthContextProvider<
  TIdentity extends AuthIdentity = AuthIdentity,
  TPermissions = any,
  TCredentials extends AuthCredentials = AuthCredentials
>(
  authProvider: AuthProvider<TIdentity, TPermissions, TCredentials>
): UseAuthContextProviderResult<TIdentity, TPermissions, TCredentials> {
  const [identity, setIdentity] = useState(() =>
    authProvider.getInitialState ? authProvider.getInitialState().identity : undefined
  )
  const [permissions, setPermissions] = useState(() =>
    authProvider.getInitialState ? authProvider.getInitialState().permissions : undefined
  )

  const [isLoggingIn, setLoggingIn] = useState(false)
  const [isLoggingOut, setLoggingOut] = useState(false)
  const [isRefreshing, setRefreshing] = useState(false)

  const [loginOpNextId, loginOpLastId] = useIdGenerator()
  const logoutPromiseRef = useRef<Promise<void> | undefined>(undefined)
  const refreshPromiseRef = useRef<
    Promise<AuthState<TIdentity, TPermissions>> | undefined
  >(undefined)

  const login = useCallback(
    async (credentials: TCredentials) => {
      const opId = loginOpNextId()
      setLoggingIn(true)
      try {
        const { identity, permissions } = await authProvider.login(credentials)

        if (!identity) {
          throw new UnauthorizedError()
        }

        setIdentity(identity)
        setPermissions(permissions)
        return { identity, permissions }
      } catch (error) {
        throw error
      } finally {
        if (opId === loginOpLastId()) {
          setLoggingIn(false)
        }
      }
    },
    [authProvider, setIdentity, setPermissions, setLoggingIn]
  )

  const logout = useCallback(async () => {
    if (logoutPromiseRef.current) {
      return logoutPromiseRef.current
    }

    setLoggingOut(true)

    try {
      logoutPromiseRef.current = authProvider.logout()
      await logoutPromiseRef.current
      setIdentity(undefined)
      setPermissions(undefined)
    } catch (error) {
      throw error
    } finally {
      logoutPromiseRef.current = undefined
      setLoggingOut(false)
    }
  }, [authProvider, setIdentity, setPermissions, setLoggingOut])

  const refresh = useCallback(async () => {
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current
    }

    setRefreshing(true)

    try {
      refreshPromiseRef.current = authProvider.refresh()
      const state = await refreshPromiseRef.current
      setIdentity(state?.identity)
      setPermissions(state?.permissions)
      return state
    } catch (error) {
      throw error
    } finally {
      refreshPromiseRef.current = undefined
      setRefreshing(false)
    }
  }, [authProvider, setIdentity, setPermissions, setRefreshing])

  useEffect(() => {
    if (!authProvider.getRefreshSignal) {
      return
    }
    return authProvider.getRefreshSignal().addListener(() => {
      refresh()
    })
  }, [authProvider, refresh])

  return {
    authProvider,
    identity,
    permissions,
    isLoggingIn,
    isLoggingOut,
    isRefreshing,
    login,
    logout,
    refresh,
  }
}
