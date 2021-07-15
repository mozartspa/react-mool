import {
  EuiAvatar,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
} from "@elastic/eui"
import { BreadcrumbsContainer } from "./Breadcrumbs"

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
          <EuiHeaderSectionItem border="none">
            <EuiHeaderSectionItemButton
              aria-label="News feed: Updates available"
              notification={true}
            >
              <EuiIcon type="cheer" size="m" />
            </EuiHeaderSectionItemButton>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </>
  )
}
