import React, { ReactNode } from "react"
import { EuiFormControlLayout } from "@elastic/eui"

export type ValueContainerProps = {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const ValueContainer: React.FC<ValueContainerProps> = (props) => {
  const { children, className, style } = props

  return (
    <EuiFormControlLayout
      className={className}
      style={style}
      css={{
        boxShadow: "inset 0 0 0 1px rgba(32,38,47,0.1)",
        borderRadius: "6px",
        backgroundColor: "white",
        padding: "12px",
        minBlockSize: 40,
      }}
    >
      {children}
    </EuiFormControlLayout>
  )
}
