import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiListGroupItem,
  EuiShowFor,
  useEuiTheme,
} from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useLocalstorageState } from "rooks"
import { t } from "../i18n"

export type HeaderNavProps = {
  menu?: ReactNode
  size?: number
}

export const HeaderNav = (props: HeaderNavProps) => {
  const { menu, size } = props

  const { euiTheme } = useEuiTheme()
  const translate = useTranslate()
  const [navIsDocked, setNavIsDocked] = useLocalstorageState("navIsDocked", true)
  const [navIsOpen, setNavIsOpen] = useState(navIsDocked)
  const history = useHistory()

  // When location changes, close nav
  useEffect(() => {
    return history.listen(() => {
      setNavIsOpen(false)
    })
  }, [])

  return (
    <EuiCollapsibleNav
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}
        >
          <EuiIcon type={"menu"} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}
      size={size}
      css={{
        backgroundColor: euiTheme.colors.body,
      }}
    >
      <EuiFlexItem className="eui-yScroll">{menu}</EuiFlexItem>
      <EuiFlexItem grow={false}>
        {/* Docking button only for larger screens that can support it*/}
        <EuiShowFor sizes={["l", "xl"]}>
          <EuiCollapsibleNavGroup background="none">
            <EuiListGroupItem
              size="xs"
              label={translate(
                navIsDocked
                  ? t.eui.layout.undock_navigation
                  : t.eui.layout.dock_navigation
              )}
              onClick={() => {
                setNavIsDocked(!navIsDocked)
              }}
              iconType={navIsDocked ? "lock" : "lockOpen"}
            />
          </EuiCollapsibleNavGroup>
        </EuiShowFor>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  )
}
