import { EuiCollapsibleNavGroup, EuiListGroup } from "@elastic/eui"
import { useLinkProps } from "@react-mool/core"
import { Menu as DefaultMenu } from "@react-mool/eui"

export const Menu = () => {
  const linkProps = useLinkProps()

  return (
    <>
      <EuiCollapsibleNavGroup background="light">
        <EuiListGroup
          listItems={[
            {
              label: "Home",
              iconType: "home",
              ...linkProps("/"),
            },
            {
              label: "Custom",
              iconType: "nested",
              ...linkProps("/custom"),
            },
          ]}
          maxWidth="none"
          color="text"
          gutterSize="none"
          size="s"
        />
      </EuiCollapsibleNavGroup>
      <DefaultMenu />
    </>
  )
}
