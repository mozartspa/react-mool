import { AuthIdentity, AuthProvider } from "@react-mool/core"
import { wait } from "./helpers/wait"
import { t } from "./i18n/en"

const identity: AuthIdentity = { displayName: "Admin" }
const permissions = "admin"

export const authProvider: AuthProvider = {
  login: async (data) => {
    await wait(300)
    if (data.username !== "demo" || data.password !== "demo") {
      throw new Error(t.eui.login.invalid_credentials)
    }
    return { identity, permissions }
  },
  logout: async () => {
    await wait(300)
  },
  refresh: async () => {
    await wait(300)
    return { identity, permissions }
  },
  getInitialState: () => ({ identity, permissions }),
}
