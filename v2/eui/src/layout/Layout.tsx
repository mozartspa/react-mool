import { EuiPage, EuiPageBody, EuiPageSection } from "@elastic/eui"
import { ReactNode } from "react"
import { Notifications } from "./Notifications"

export type LayoutProps = {
  children?: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <>
      <EuiPage paddingSize="none" direction="column">
        <EuiPageBody>
          <EuiPageSection className="eui-fullHeight" restrictWidth color="plain">
            {children}
          </EuiPageSection>
        </EuiPageBody>
      </EuiPage>
      <Notifications />
    </>
  )
}
