import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiListGroupItem,
  EuiShowFor,
} from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { t } from "../i18n"

export type HeaderNavProps = {
  menu?: ReactNode
}

export const HeaderNav = (props: HeaderNavProps) => {
  const { menu } = props
  const translate = useTranslate()
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem("navIsDocked"))) || false
  )
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem("navIsDocked"))) || false
  )

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
    >
      <EuiFlexItem className="eui-yScroll">{menu}</EuiFlexItem>
      <EuiFlexItem grow={false}>
        {/* Docking button only for larger screens that can support it*/}
        <EuiShowFor sizes={["l", "xl"]}>
          <EuiCollapsibleNavGroup>
            <EuiListGroupItem
              size="xs"
              color="subdued"
              label={translate(
                navIsDocked
                  ? t.eui.layout.undock_navigation
                  : t.eui.layout.dock_navigation
              )}
              onClick={() => {
                setNavIsDocked(!navIsDocked)
                localStorage.setItem("navIsDocked", JSON.stringify(!navIsDocked))
              }}
              iconType={navIsDocked ? "lock" : "lockOpen"}
            />
          </EuiCollapsibleNavGroup>
        </EuiShowFor>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  )
}
