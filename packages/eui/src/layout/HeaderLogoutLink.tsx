import { EuiLink } from "@elastic/eui"
import { useAuthContext, useTranslate } from "@react-mool/core"
import { t } from "../i18n"

export const HeaderLogoutLink = () => {
  const { logout, isLoggingOut } = useAuthContext()
  const translate = useTranslate()

  return (
    <EuiLink onClick={logout} disabled={isLoggingOut}>
      {translate(t.eui.logout.logout_btn)}
    </EuiLink>
  )
}
