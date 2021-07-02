import { EuiPage, EuiPageContent, EuiPageContentBody, EuiPageSideBar } from "@elastic/eui"
import { ComponentType, ReactNode } from "react"
import { Header } from "./Header"
import { Menu } from "./Menu"

export type LayoutProps = {
  menu?: ComponentType
  children?: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const { menu, children } = props

  const MenuComp = menu || Menu

  return (
    <>
      <Header />
      <EuiPage paddingSize="none" style={{ minHeight: "calc(100vh - 96px)" }}>
        <EuiPageSideBar sticky>
          <MenuComp />
        </EuiPageSideBar>
        <EuiPageContent>
          <EuiPageContentBody>{children}</EuiPageContentBody>
        </EuiPageContent>
      </EuiPage>
    </>
  )
}
