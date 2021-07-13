import { EuiButton, EuiSpacer } from "@elastic/eui"
import {
  AuthProvider,
  createRefreshSignal,
  useAuthContext,
  useAuthIdentity,
  useAuthPermissions,
  useIsAuthenticated,
} from "@react-mool/core"
import { wait } from "../helpers/wait"
import { t } from "../i18n/en"

let name = "Pippo"

const signal = createRefreshSignal()

/*setInterval(() => {
  signal.requestRefresh()
}, 2000)*/

export const authProvider: AuthProvider = {
  login: async (data) => {
    await wait(300)
    if (data.username !== "demo" || data.password !== "demo") {
      throw new Error(t.eui.login.invalid_credentials)
    }
    return { identity: { displayName: name }, permissions: "admin" }
  },
  logout: async () => {
    await wait(300)
  },
  getIdentity: async () => {
    await wait(300)
    name = "Pippo_" + Math.random()
    return {
      displayName: name,
    }
  },
  getPermissions: async () => {
    return {}
  },
  getRefreshSignal: () => signal,
}

export function TestAuth() {
  const auth = useAuthContext()
  const isAuthenticated = useIsAuthenticated()
  const identity = useAuthIdentity()
  const permissions = useAuthPermissions()

  return (
    <div>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
      <EuiSpacer />
      <EuiButton onClick={auth.login} isLoading={auth.isLoggingIn}>
        Login
      </EuiButton>{" "}
      <EuiButton onClick={auth.logout} isLoading={auth.isLoggingOut}>
        Logout
      </EuiButton>{" "}
      <EuiButton onClick={auth.refresh} isLoading={auth.isRefreshing}>
        Refresh
      </EuiButton>{" "}
      <EuiSpacer />
      <pre>Is Authenticated: {JSON.stringify(isAuthenticated, null, 2)}</pre>
      <pre>Identity: {JSON.stringify(identity, null, 2)}</pre>
      <pre>Permissions: {JSON.stringify(permissions, null, 2)}</pre>
    </div>
  )
}
