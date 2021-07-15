import { EuiPage, EuiPageContent, EuiPageContentBody } from "@elastic/eui"
import { ComponentType, ReactNode } from "react"
import { Header } from "./Header"
import { Menu } from "./Menu"
import { Notifications } from "./Notifications"

export type LayoutProps = {
  menu?: ComponentType
  children?: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const { menu, children } = props

  const MenuComp = menu || Menu

  return (
    <>
      <Header menu={<MenuComp />} />
      <EuiPage paddingSize="none" style={{ minHeight: "calc(100vh - 48px)" }}>
        <EuiPageContent>
          <EuiPageContentBody>{children}</EuiPageContentBody>
        </EuiPageContent>
      </EuiPage>
      <Notifications />
    </>
  )
}
