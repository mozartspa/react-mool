import {
  EuiCollapsibleNavGroup,
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
} from "@elastic/eui"
import { useLinkProps } from "../helpers/useLinkProps"

export const KibanaNavLinks: EuiPinnableListGroupItemProps[] = [
  { label: "Discover" },
  { label: "Visualize" },
  { label: "Dashboards" },
  { label: "Canvas" },
  { label: "Maps" },
  { label: "Machine Learning" },
  { label: "Graph" },
]

export const Menu = () => {
  const getLinkProps = useLinkProps()
  return (
    <>
      <EuiCollapsibleNavGroup background="light">
        <EuiPinnableListGroup
          listItems={[
            {
              label: "Dashboard",
              iconType: "home",
              isActive: false,
              pinnable: false,
            },
            { label: "Auctions", pinned: true, ...getLinkProps("/") },
            { label: "Users", pinned: true },
            { label: "Tags", pinned: true },
          ]}
          onPinClick={() => {}}
          maxWidth="none"
          color="text"
          gutterSize="none"
          size="s"
        />
      </EuiCollapsibleNavGroup>
      <EuiCollapsibleNavGroup
        title="Kibana"
        iconType="logoKibana"
        isCollapsible={true}
        initialIsOpen={true}
      >
        <EuiPinnableListGroup
          listItems={KibanaNavLinks}
          onPinClick={() => {}}
          maxWidth="none"
          color="subdued"
          gutterSize="none"
          size="s"
        />
      </EuiCollapsibleNavGroup>
    </>
  )
}
