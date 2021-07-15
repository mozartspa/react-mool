import {
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeaderSectionItemButton,
  EuiPopover,
  EuiSpacer,
  EuiText,
  htmlIdGenerator,
} from "@elastic/eui"
import { useAuthIdentity, useTranslate } from "@react-mool/core"
import { useState } from "react"
import { t } from "../i18n"
import { HeaderLogoutLink } from "./HeaderLogoutLink"

export const HeaderUserMenu = () => {
  const id = htmlIdGenerator()()
  const [isOpen, setIsOpen] = useState(false)
  const { displayName, avatar } = useAuthIdentity() || {}
  const translate = useTranslate()

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label={translate(t.eui.logout.account_menu)}
      onClick={onMenuButtonClick}
    >
      <EuiAvatar name={displayName || ""} imageUrl={avatar || ""} size="s" />
    </EuiHeaderSectionItemButton>
  )

  // No displayName means no user menu
  if (!displayName) {
    return null
  }

  return (
    <EuiPopover
      id={id}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
      buffer={[4, 4, 4, 4]}
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup gutterSize="m" className="euiHeaderProfile" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiAvatar name={displayName} size="xl" />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>{displayName}</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <HeaderLogoutLink />
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  )
}
