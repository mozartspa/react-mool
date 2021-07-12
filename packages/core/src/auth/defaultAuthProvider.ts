import { AuthProvider } from "./auth"

export const defaultAuthProvider: AuthProvider = {
  login: async () => {
    return { identity: {}, permissions: {} }
  },
  logout: async () => {},
  getIdentity: async () => {
    return {}
  },
  getPermissions: async () => {
    return {}
  },
  getInitialState: () => {
    return { identity: {}, permissions: {} }
  },
}
