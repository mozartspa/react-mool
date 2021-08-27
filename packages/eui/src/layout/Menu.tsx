import { EuiCollapsibleNavGroup, EuiListGroup, EuiListGroupItemProps } from "@elastic/eui"
import {
  useGetResourceLabel,
  useResourceDefinitionList,
  useTranslate,
} from "@react-mool/core"
import { useLinkProps } from "../helpers/useLinkProps"
import { t } from "../i18n"

export type MenuProps = {
  hasDashboard?: boolean
}

export const Menu = (props: MenuProps) => {
  const { hasDashboard } = props

  const getLinkProps = useLinkProps()
  const resources = useResourceDefinitionList()
  const getResourceLabel = useGetResourceLabel()
  const translate = useTranslate()

  const resourceItems: EuiListGroupItemProps[] = resources
    .filter((def) => def.list != null)
    .map((def) => ({
      label: getResourceLabel(def.name, 2),
      iconType: def.icon || "list",
      ...getLinkProps(`/${def.name}`),
    }))

  const dashboardItem: EuiListGroupItemProps = {
    label: translate(t.eui.layout.dashboard),
    iconType: "dashboardApp",
    ...getLinkProps("/"),
  }

  const menuItems = hasDashboard ? [dashboardItem, ...resourceItems] : resourceItems

  return (
    <EuiCollapsibleNavGroup background="light">
      <EuiListGroup
        listItems={menuItems}
        maxWidth="none"
        color="text"
        gutterSize="none"
        size="s"
      />
    </EuiCollapsibleNavGroup>
  )
}
