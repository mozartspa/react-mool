import { EuiCollapsibleNavGroup, EuiListGroup } from "@elastic/eui"
import { useLinkProps } from "@react-mool/core"
import { Menu as DefaultMenu, MenuProps } from "@react-mool/eui"

export const Menu = (props: MenuProps) => {
  const linkProps = useLinkProps()

  return (
    <>
      <EuiCollapsibleNavGroup background="light">
        <EuiListGroup
          listItems={[
            {
              label: "Custom",
              iconType: "nested",
              ...linkProps("/custom"),
            },
            {
              label: "Product list 2",
              iconType: "nested",
              ...linkProps("/product2"),
            },
          ]}
          maxWidth="none"
          color="text"
          gutterSize="none"
          size="s"
        />
      </EuiCollapsibleNavGroup>
      <DefaultMenu {...props} />
    </>
  )
}
