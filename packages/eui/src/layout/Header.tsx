import {
  EuiAvatar,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
} from "@elastic/eui"

const defaultBreadcrumbs = [
  {
    text: "Gestione immobili",
  },
  {
    text: "Aste",
  },
  {
    text: "Elenco",
  },
]

export const Header = ({ breadcrumbs = defaultBreadcrumbs }) => (
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
    <EuiHeader
      position="static"
      sections={[
        {
          items: [
            <EuiHeaderSectionItemButton aria-label="Account menu">
              <EuiAvatar type="space" name="Default Space" size="s" />
            </EuiHeaderSectionItemButton>,
          ],
          breadcrumbs: breadcrumbs,
          borders: "right",
        },
        {
          items: [
            <EuiHeaderSectionItemButton
              aria-label="News feed: Updates available"
              notification={true}
            >
              <EuiIcon type="cheer" size="m" />
            </EuiHeaderSectionItemButton>,
          ],
          borders: "none",
        },
      ]}
    />
  </>
)
