import { EuiPage, EuiPageContent, EuiPageContentBody, IconType } from "@elastic/eui"
import { ComponentType, ReactNode } from "react"
import { Header } from "./Header"
import { Menu } from "./Menu"
import { Notifications } from "./Notifications"

export type LayoutProps = {
  hasDashboard?: boolean
  menu?: ComponentType<{ hasDashboard?: boolean }>
  menuSize?: number
  appLogo?: IconType
  appTitle?: ReactNode
  children?: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const { hasDashboard, menu, menuSize, appLogo, appTitle, children } = props

  const MenuComp = menu || Menu

  return (
    <>
      <Header
        menu={<MenuComp hasDashboard={hasDashboard} />}
        menuSize={menuSize}
        appLogo={appLogo}
        appTitle={appTitle}
      />
      <EuiPage paddingSize="none" style={{ minHeight: "calc(100vh - 48px)" }}>
        <EuiPageContent>
          <EuiPageContentBody className="eui-fullHeight">{children}</EuiPageContentBody>
        </EuiPageContent>
      </EuiPage>
      <Notifications />
    </>
  )
}
