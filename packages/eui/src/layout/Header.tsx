import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  IconType,
} from "@elastic/eui"
import { useLinkProps } from "@react-mool/core"
import { ReactNode } from "react"
import { BreadcrumbsContainer } from "./Breadcrumbs"
import { HeaderNav } from "./HeaderNav"
import { HeaderUserMenu } from "./HeaderUserMenu"

export type HeaderProps = {
  menu?: ReactNode
  menuSize?: number
  appLogo?: IconType
  appTitle?: ReactNode
}

export const Header = (props: HeaderProps) => {
  const { menu, menuSize, appLogo = "logoElastic", appTitle = "Admin" } = props
  const linkProps = useLinkProps()

  return (
    <EuiHeader position="fixed">
      <EuiHeaderSection>
        {!!menu && (
          <EuiHeaderSectionItem>
            <HeaderNav menu={menu} size={menuSize} />
          </EuiHeaderSectionItem>
        )}
        <EuiHeaderSectionItem>
          <EuiHeaderLogo iconType={appLogo} {...linkProps("/")}>
            {appTitle}
          </EuiHeaderLogo>
        </EuiHeaderSectionItem>
        <BreadcrumbsContainer />
      </EuiHeaderSection>

      <EuiHeaderSection>
        <EuiHeaderSectionItem>
          <HeaderUserMenu />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  )
}
