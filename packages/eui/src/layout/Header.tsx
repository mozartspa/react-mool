import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
} from "@elastic/eui"
import { ReactNode } from "react"
import { BreadcrumbsContainer } from "./Breadcrumbs"
import { HeaderNav } from "./HeaderNav"
import { HeaderUserMenu } from "./HeaderUserMenu"

export type HeaderProps = {
  menu?: ReactNode
}

export const Header = (props: HeaderProps) => {
  const { menu } = props

  return (
    <>
      <EuiHeader position="fixed">
        <EuiHeaderSection>
          {!!menu && (
            <EuiHeaderSectionItem border="right">
              <HeaderNav menu={menu} />
            </EuiHeaderSectionItem>
          )}
          <EuiHeaderSectionItem border="right">
            <EuiHeaderLogo iconType="logoElastic">Elastic</EuiHeaderLogo>
          </EuiHeaderSectionItem>
          <BreadcrumbsContainer />
        </EuiHeaderSection>

        <EuiHeaderSection>
          <EuiHeaderSectionItem border="left">
            <HeaderUserMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </>
  )
}
