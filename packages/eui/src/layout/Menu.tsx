import { EuiCollapsibleNavGroup, EuiListGroup, EuiListGroupItemProps } from "@elastic/eui"
import {
  useGetResourceLabel,
  useLinkProps,
  useResourceDefinitionList,
  useTranslate,
} from "@react-mool/core"
import { useLocation } from "react-router"
import { t } from "../i18n"

function isPartialMatch(current: string, target: string) {
  return current === target || current.startsWith(`${target}/`)
}

export type MenuProps = {
  hasDashboard?: boolean
}

export const Menu = (props: MenuProps) => {
  const { hasDashboard } = props

  const getLinkProps = useLinkProps()
  const resources = useResourceDefinitionList()
  const getResourceLabel = useGetResourceLabel()
  const translate = useTranslate()
  const location = useLocation()

  const resourceItems: EuiListGroupItemProps[] = resources
    .filter((def) => def.list != null)
    .map((def) => ({
      label: getResourceLabel(def.name, 2),
      iconType: def.icon || "list",
      isActive: isPartialMatch(location.pathname, `/${def.name}`),
      ...getLinkProps(`/${def.name}`),
    }))

  const dashboardItem: EuiListGroupItemProps = {
    label: translate(t.eui.layout.dashboard),
    iconType: "dashboardApp",
    isActive: location.pathname === "/",
    ...getLinkProps("/"),
  }

  const menuItems = hasDashboard ? [dashboardItem, ...resourceItems] : resourceItems

  return (
    <EuiCollapsibleNavGroup background="none">
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
