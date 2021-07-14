import { EuiCard, EuiFlexGroup, EuiPageTemplate, EuiSpacer } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode } from "react"
import { t } from "../i18n"

export type LoginLayoutProps = {
  children?: ReactNode
}

export const LoginLayout = (props: LoginLayoutProps) => {
  const { children } = props

  const translate = useTranslate()

  return (
    <EuiPageTemplate template="default" style={{ minHeight: "100vh" }}>
      <EuiSpacer size="xxl" />
      <EuiFlexGroup justifyContent="center">
        <EuiCard
          title={translate(t.eui.login.title)}
          paddingSize="l"
          style={{ maxWidth: 430 }}
        >
          <EuiSpacer />
          {children}
        </EuiCard>
      </EuiFlexGroup>
    </EuiPageTemplate>
  )
}
