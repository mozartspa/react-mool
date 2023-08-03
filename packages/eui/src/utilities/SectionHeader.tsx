import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiIcon,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiTitleProps,
  IconType,
  useIsWithinBreakpoints,
} from "@elastic/eui"
import { ReactNode } from "react"

export type SectionHeaderProps = {
  title?: ReactNode
  titleProps?: Omit<EuiTitleProps, "children">
  icon?: IconType
  description?: ReactNode
  actions?: ReactNode[]
  divider?: boolean
  children?: ReactNode
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { title, titleProps, icon, description, actions, divider, children } = props

  const isResponsiveBreakpoint = useIsWithinBreakpoints(["xs", "s"])

  let descriptionNode
  if (description) {
    descriptionNode = (
      <>
        {title && <EuiSpacer />}
        <EuiText grow={false}>
          <p>{description}</p>
        </EuiText>
      </>
    )
  }

  let titleNode
  if (title) {
    const iconNode = icon ? (
      <EuiIcon size="l" type={icon} className="muiSectionHeader__titleIcon" />
    ) : undefined

    titleNode = (
      <EuiTitle size="s" {...titleProps}>
        <h3>
          {iconNode}
          {title}
        </h3>
      </EuiTitle>
    )
  }

  let rightSideFlexItem
  if (actions && actions.length) {
    const wrapWithFlex = () => {
      return actions.map((item, index) => {
        return (
          <EuiFlexItem grow={false} key={index}>
            {item}
          </EuiFlexItem>
        )
      })
    }

    rightSideFlexItem = (
      <EuiFlexItem grow={false}>
        <EuiFlexGroup
          wrap
          responsive={false}
          gutterSize="s"
          className="euiPageHeaderContent__rightSideItems"
        >
          {wrapWithFlex()}
        </EuiFlexGroup>
      </EuiFlexItem>
    )
  }

  const childrenNode = children && (
    <div className="euiPageHeaderContent__bottom">
      <EuiSpacer />
      {children}
    </div>
  )

  const classes = "euiPageHeaderContent"

  const content =
    descriptionNode || isResponsiveBreakpoint ? (
      <div className={classes}>
        <EuiFlexGroup
          className="euiPageHeaderContent__top"
          alignItems="flexStart"
          gutterSize="m"
        >
          <EuiFlexItem>
            {titleNode}
            {descriptionNode}
          </EuiFlexItem>
          {rightSideFlexItem}
        </EuiFlexGroup>
        {childrenNode}
      </div>
    ) : (
      <div className={classes}>
        <EuiFlexGroup
          className="euiPageHeaderContent__top"
          alignItems={"center"}
          gutterSize="m"
        >
          <EuiFlexItem>
            {titleNode}
            {childrenNode}
          </EuiFlexItem>
          {rightSideFlexItem}
        </EuiFlexGroup>
      </div>
    )

  return (
    <>
      {content}
      {divider && <EuiHorizontalRule />}
    </>
  )
}
