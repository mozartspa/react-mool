import {
  EuiBreakpointSize,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHideFor,
  EuiIcon,
  EuiPopover,
  EuiShowFor,
  EuiSpacer,
  EuiText,
  EuiTitle,
  IconType,
} from "@elastic/eui"
import { useGetResourceLabel, useResource, useResourceDefinition } from "@react-mool/core"
import { ReactNode, useState } from "react"

const mobileBreakpoints: EuiBreakpointSize[] = ["xs", "s"]

export type ListHeaderProps = {
  resource?: string
  title?: ReactNode
  icon?: IconType
  text?: ReactNode
  actions?: ReactNode | ReactNode[]
}

export const ListHeader = (props: ListHeaderProps) => {
  const resource = useResource(props.resource)
  const definition = useResourceDefinition(resource)
  const getLabel = useGetResourceLabel()

  const {
    title = getLabel(resource, 2),
    icon = definition.icon ?? "list",
    text,
    actions,
  } = props

  return (
    <>
      <EuiFlexGroup alignItems="center" responsive={false}>
        <EuiHideFor sizes={mobileBreakpoints}>
          <EuiFlexItem grow={false}>
            <EuiIcon type={icon} size="xl" />
          </EuiFlexItem>
        </EuiHideFor>

        <EuiFlexItem>
          <EuiTitle size="l">
            <h1>{title}</h1>
          </EuiTitle>
        </EuiFlexItem>

        {!!actions && (
          <EuiFlexItem grow={false}>
            <Actions items={actions} popoverBreakpoints={mobileBreakpoints} />
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
      <EuiSpacer size="s" />
      {!!text && <EuiText>{text}</EuiText>}
    </>
  )
}

type ActionsProps = {
  items?: ReactNode | ReactNode[]
  popoverBreakpoints?: EuiBreakpointSize[]
}

const Actions = (props: ActionsProps) => {
  const { items, popoverBreakpoints = mobileBreakpoints } = props

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

  if (!items) {
    return null
  }

  if (!Array.isArray(items)) {
    return <>{items}</>
  }

  const button = (
    <EuiButtonIcon
      iconType="apps"
      display="base"
      onClick={() => setMobileMenuIsOpen(true)}
    />
  )

  return (
    <>
      <EuiHideFor sizes={popoverBreakpoints}>
        <EuiFlexGroup alignItems="center" gutterSize="s">
          {items.map((item, i) => (
            <EuiFlexItem key={i} grow={false}>
              {item}
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      </EuiHideFor>
      <EuiShowFor sizes={popoverBreakpoints}>
        <EuiPopover
          button={button}
          isOpen={mobileMenuIsOpen}
          anchorPosition="downRight"
          buffer={[4, 4, 4, 4]}
          closePopover={() => setMobileMenuIsOpen(false)}
          panelPaddingSize="s"
        >
          <EuiFlexGroup direction="column" responsive={false} gutterSize="s">
            {items.map((item, i) => (
              <EuiFlexItem key={i} grow={false}>
                {item}
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        </EuiPopover>
      </EuiShowFor>
    </>
  )
}
