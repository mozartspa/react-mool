import { EuiPage, EuiPageContent, EuiPageContentBody, EuiPageSideBar } from "@elastic/eui"
import { ReactNode } from "react"
import { Header } from "./Header"
import { Menu } from "./Menu"

export type LayoutProps = {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <EuiPage paddingSize="none" style={{ minHeight: "calc(100vh - 96px)" }}>
      <EuiPageSideBar sticky>
        <Menu />
      </EuiPageSideBar>
      <EuiPageContent>
        <EuiPageContentBody>{children}</EuiPageContentBody>
      </EuiPageContent>
    </EuiPage>
  </>
)
