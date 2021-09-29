import { EuiBadge, EuiBadgeProps } from "@elastic/eui"
import { Count, CountProps } from "./Count"

type BadgeProps = Pick<EuiBadgeProps, "iconType" | "iconSide" | "color" | "isDisabled">

export type BadgeCountProps<TFilter = any> = Omit<CountProps<TFilter>, "children"> &
  BadgeProps

export const BadgeCount = (props: BadgeCountProps) => {
  const { resource, filter, color = "hollow", ...badgeProps } = props

  return (
    <Count resource={resource} filter={filter}>
      {(count) => (
        <EuiBadge color={color} {...badgeProps}>
          {count}
        </EuiBadge>
      )}
    </Count>
  )
}
