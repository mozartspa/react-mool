import {
  EuiCollapsibleNavGroup,
  EuiIcon,
  EuiListGroup,
  EuiListGroupItemProps,
} from "@elastic/eui"
import { useGetResourceLabel, useResourceDefinitionList } from "@react-mool/core"
import { useLinkProps } from "@react-mool/eui"

export const Menu = () => {
  const getLinkProps = useLinkProps()
  const resources = useResourceDefinitionList()
  const getResourceLabel = useGetResourceLabel()

  const listItems: EuiListGroupItemProps[] = resources
    .filter((def) => def.list != null)
    .map((def) => ({
      label: getResourceLabel(def.name, 2),
      icon: def.icon || <EuiIcon type="list" />,
      ...getLinkProps(`/${def.name}`),
    }))

  return (
    <EuiCollapsibleNavGroup background="light">
      <EuiListGroup
        listItems={listItems}
        maxWidth="none"
        color="text"
        gutterSize="none"
        size="s"
      />
    </EuiCollapsibleNavGroup>
  )
}
