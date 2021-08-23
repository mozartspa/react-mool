import {
  EuiFlexGroup,
  EuiFlexGroupProps,
  EuiFlexItem,
  EuiFlexItemProps,
  EuiSpacer,
  EuiSpacerProps,
} from "@elastic/eui"
import React from "react"

export type RowProps = EuiFlexGroupProps & {
  grows?: EuiFlexItemProps["grow"][]
  spacer?: boolean | EuiSpacerProps["size"]
}

export const Row = (props: RowProps) => {
  const { grows = [], spacer: spacerProp = false, children, ...groupProps } = props

  const spacer = spacerProp === true ? "m" : spacerProp

  const content = (
    <EuiFlexGroup {...groupProps}>
      {React.Children.map(children, (child, index) => (
        <EuiFlexItem key={index} grow={grows[index]}>
          {child}
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
  )

  if (!spacer) {
    return content
  } else {
    return (
      <>
        {content}
        <EuiSpacer size={spacer} />
      </>
    )
  }
}
