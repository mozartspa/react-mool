import { EuiBadge, EuiTab, EuiTabs } from "@elastic/eui"
import {
  useAddFilter,
  useGetList,
  useListContext,
  useResource,
  useStorage,
  useSyncWithURL,
  UseSyncWithURLOptions,
  useTranslate,
} from "@react-mool/core"
import { ReactNode, useCallback, useState } from "react"
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
  syncWithURL?: boolean
  syncWithURLParam?: string
  syncWithURLMode?: UseSyncWithURLOptions["historyMode"]
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
    syncWithURL = false,
    syncWithURLParam = "filterGroup",
    syncWithURLMode = "push",
  } = props

  const resource = useResource()
  const translate = useTranslate()
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

  useSyncWithURL({
    value: selectedName,
    onChange: setSelectedName,
    queryParam: syncWithURLParam,
    enabled: syncWithURL,
    historyMode: syncWithURLMode,
  })

  const getGroupLabel = useCallback(
    (group: TabbedFilterGroup) => {
      if (group.label) {
        return translate(group.label)
      } else {
        return translate(`resources.${resource}.filterGroups.${group.name}`, {
          defaultValue: group.name,
        })
      }
    },
    [translate, resource]
  )

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
          {getGroupLabel(group)} {showCount && <BadgeCount group={group} />}
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

  const color = query.data ? "hollow" : "transparent"

  return <EuiBadge color={color}>{query.data?.total ?? "\u00a0\u00a0"}</EuiBadge>
}
