import { EuiBadge, EuiTab, EuiTabs } from "@elastic/eui"
import { useAddFilter, useGetList, useListContext } from "@react-mool/core"
import { ReactNode, useState } from "react"
import { useUpdateEffect } from "rooks"

export type TabbedFilterGroup<TFilter = any> = {
  name: string
  label?: ReactNode
  filter?: TFilter | undefined
}

export type TabbedFilterGroupsProps<TFilter = any> = {
  groups: TabbedFilterGroup<TFilter>[]
  initialSelected?: string
  showCount?: boolean
}

export function TabbedFilterGroups<TFilter = any>(
  props: TabbedFilterGroupsProps<TFilter>
) {
  const { groups, showCount = true } = props

  const initialSelected = props.initialSelected ?? groups[0]?.name
  const initialFilter = initialSelected
    ? groups.find((o) => o.name === initialSelected)?.filter
    : undefined

  const [_, setFilter] = useAddFilter(initialFilter)
  const [selectedName, setSelectedName] = useState(initialSelected)

  const selectedFilter = groups.find((o) => o.name === selectedName)?.filter

  useUpdateEffect(() => {
    setFilter(selectedFilter)
  }, [JSON.stringify(selectedFilter)])

  return (
    <EuiTabs display="default">
      {groups.map((group) => (
        <EuiTab
          key={group.name}
          isSelected={selectedName === group.name}
          onClick={() => {
            setSelectedName(group.name)
          }}
        >
          {group.label || group.name} {showCount && <BadgeCount group={group} />}
        </EuiTab>
      ))}
    </EuiTabs>
  )
}

type BadgeCountProps = {
  group: TabbedFilterGroup
}

function BadgeCount(props: BadgeCountProps) {
  const { group } = props

  const { baseFilter, mergeFilters } = useListContext()

  const query = useGetList({
    page: 1,
    pageSize: 1,
    filter: mergeFilters(group.filter, baseFilter),
  })

  return <EuiBadge color="hollow">{query.data?.total}</EuiBadge>
}
