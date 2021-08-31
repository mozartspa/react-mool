import isEqual from "react-fast-compare"
import { logError } from "../helpers/console"
import { createRefreshSignal } from "../helpers/refreshSignal"
import { AuthCredentials, AuthIdentity, AuthProvider, AuthState } from "./auth"

export type PersistedAuthProviderConfig<
  TIdentity extends AuthIdentity = AuthIdentity,
  TPermissions = any,
  TCredentials extends AuthCredentials = AuthCredentials
> = {
  login: (credentials: TCredentials) => Promise<AuthState<TIdentity, TPermissions>>
  logout: () => Promise<void>
  refresh?: () => Promise<AuthState<TIdentity, TPermissions>>
  storage?: Storage
  storageKey?: string
}

export function createPersistedAuthProvider<
  TIdentity extends AuthIdentity = AuthIdentity,
  TPermissions = any,
  TCredentials extends AuthCredentials = AuthCredentials
>(config: PersistedAuthProviderConfig<TIdentity, TPermissions, TCredentials>) {
  const { login, logout, refresh, storage = localStorage, storageKey = "__AUTH" } = config

  function save(state: AuthState<TIdentity, TPermissions>) {
    // save to storage only if data changed, otherwise we could be trapped in an infinite loop
    if (!isEqual(state, load())) {
      storage.setItem(storageKey, JSON.stringify(state))
    }
  }

  function load() {
    try {
      const raw = storage.getItem(storageKey)
      if (raw) {
        return JSON.parse(raw) as AuthState<TIdentity, TPermissions>
      }
    } catch (err) {
      logError(err)
    }

    return {
      identity: undefined,
      permissions: undefined,
    }
  }

  const refreshSignal = createRefreshSignal()

  // In case of localStorage, listen to changes and request to refresh the auth state
  if (storage === localStorage) {
    window.addEventListener("storage", (event) => {
      if (event.key === storageKey) {
        refreshSignal.requestRefresh()
      }
    })
  }

  const authProvider: AuthProvider<TIdentity, TPermissions, TCredentials> = {
    logout,
    login: (...args) => {
      return login(...args).then((state) => {
        save(state)
        return state
      })
    },
    refresh: async (...args) => {
      if (refresh) {
        return refresh(...args).then((state) => {
          save(state)
          return state
        })
      } else {
        return load()
      }
    },
    getInitialState: () => {
      return load()
    },
    getRefreshSignal: () => {
      return refreshSignal
    },
  }

  return authProvider
}
