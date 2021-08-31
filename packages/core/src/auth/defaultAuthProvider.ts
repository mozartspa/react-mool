import { AuthProvider } from "./auth"

const identity = {}
const permissions = {}

export const defaultAuthProvider: AuthProvider = {
  login: async () => {
    return { identity, permissions }
  },
  logout: async () => {},
  refresh: async () => {
    return { identity, permissions }
  },
  getInitialState: () => {
    return { identity, permissions }
  },
}
