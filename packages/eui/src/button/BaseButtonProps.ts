import { EuiButtonIconProps, EuiButtonProps, ExclusiveUnion } from "@elastic/eui"
import { MouseEventHandler } from "react"

type CommonProps = {
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
}

type ButtonProps = Partial<EuiButtonProps>

type ButtonAsIconProps = Partial<EuiButtonIconProps> & { asIcon: true }

export type BaseButtonProps = CommonProps & ExclusiveUnion<ButtonProps, ButtonAsIconProps>
