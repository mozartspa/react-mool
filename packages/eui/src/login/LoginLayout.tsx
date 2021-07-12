import { EuiCard, EuiIcon, EuiPageTemplate, EuiSpacer } from "@elastic/eui"
import { ReactNode } from "react"

export type LoginLayoutProps = {
  children?: ReactNode
}

export const LoginLayout = (props: LoginLayoutProps) => {
  const { children } = props

  return (
    <EuiPageTemplate
      template="centeredBody"
      pageContentProps={{ paddingSize: "none", style: { minWidth: 400 } }}
    >
      <EuiCard
        title="Log in"
        icon={<EuiIcon type="logoAppSearch" size="xl" />}
        paddingSize="l"
      >
        <EuiSpacer />
        {children}
      </EuiCard>
    </EuiPageTemplate>
  )
}
