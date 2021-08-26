import { EuiButtonIconProps, EuiButtonProps, ExclusiveUnion } from "@elastic/eui"

type ButtonProps = Partial<EuiButtonProps>

type ButtonAsIconProps = Partial<EuiButtonIconProps> & { asIcon: true }

export type BaseButtonProps = ExclusiveUnion<ButtonProps, ButtonAsIconProps>
