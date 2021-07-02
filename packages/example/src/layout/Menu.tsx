import { EuiCollapsibleNavGroup, EuiPinnableListGroup } from "@elastic/eui"
import { useLinkProps } from "@react-mool/eui"

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
              ...getLinkProps("/"),
            },
            { label: "Products", pinned: true, ...getLinkProps("/products") },
          ]}
          onPinClick={() => {}}
          maxWidth="none"
          color="text"
          gutterSize="none"
          size="s"
        />
      </EuiCollapsibleNavGroup>
    </>
  )
}
