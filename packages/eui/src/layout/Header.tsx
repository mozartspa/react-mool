import {
  EuiAvatar,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
} from "@elastic/eui"
import { BreadcrumbsContainer } from "./Breadcrumbs"
import { HeaderUserMenu } from "./HeaderUserMenu"

export const Header = () => {
  return (
    <>
      <EuiHeader
        theme="dark"
        position="static"
        sections={[
          {
            items: [<EuiHeaderLogo iconType="logoElastic">Elastic</EuiHeaderLogo>],
            borders: "none",
          },
          {
            items: [
              <EuiHeaderSectionItemButton aria-label="Account menu">
                <EuiAvatar name="John Username" size="s" />
              </EuiHeaderSectionItemButton>,
            ],
            borders: "none",
          },
        ]}
      />
      <EuiHeader position="static">
        <EuiHeaderSection>
          <EuiHeaderSectionItem border="right">
            <EuiHeaderSectionItemButton aria-label="Account menu">
              <EuiAvatar type="space" name="Default Space" size="s" />
            </EuiHeaderSectionItemButton>
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
