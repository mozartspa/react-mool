import { EuiBadge, EuiTab, EuiTabs } from "@elastic/eui"
import {
  useAddFilter,
  useGetList,
  useListContext,
  useResource,
  useStorage,
} from "@react-mool/core"
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
  restoreFromLast?: boolean
  restoreKey?: string
  restoreStorage?: Storage
}

export function TabbedFilterGroups<TFilter = any>(
  props: TabbedFilterGroupsProps<TFilter>
) {
  const {
    groups,
    showCount = true,
    restoreFromLast = true,
    restoreKey,
    restoreStorage,
  } = props

  const resource = useResource()
  const storage = useStorage(restoreKey ?? `${resource}-tabbedfiltergroup`, {
    enabled: restoreFromLast,
    storage: restoreStorage,
  })

  const [selectedName, setSelectedName] = useState(() =>
    storage.get(props.initialSelected ?? groups[0]?.name)
  )

  const setFilter = useAddFilter(() => {
    return selectedName ? groups.find((o) => o.name === selectedName)?.filter : undefined
  })

  const selectedFilter = groups.find((o) => o.name === selectedName)?.filter

  useUpdateEffect(() => {
    setFilter(selectedFilter)
  }, [JSON.stringify(selectedFilter)])

  useUpdateEffect(() => {
    storage.set(selectedName)
  }, [selectedName])

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
