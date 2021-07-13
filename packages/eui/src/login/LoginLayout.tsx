import { EuiCard, EuiIcon, EuiPageTemplate, EuiSpacer } from "@elastic/eui"
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
    <EuiPageTemplate
      template="centeredBody"
      pageContentProps={{ paddingSize: "none", style: { minWidth: 400 } }}
    >
      <EuiCard
        title={translate(t.eui.login.title)}
        icon={<EuiIcon type="logoAppSearch" size="xl" />}
        paddingSize="l"
      >
        <EuiSpacer />
        {children}
      </EuiCard>
    </EuiPageTemplate>
  )
}
