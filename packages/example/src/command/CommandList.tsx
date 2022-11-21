import { EuiLink, EuiSpacer } from "@elastic/eui"
import { useGetList, useLinkProps } from "@react-mool/core"
import {
  Column,
  Datagrid,
  DateColumn,
  FilterBar,
  List,
  ListHeader,
  NumberColumn,
  TabbedFilterGroups,
  TextColumn,
  TextFilter,
  useDefaultDatagridActions,
} from "@react-mool/eui"
import { useMemo } from "react"
import { Command } from "../gqless"
import { CustomCreateButton } from "./CustomCreateButton"

export const CommandList = () => {
  const linkProps = useLinkProps()
  const defaultActions = useDefaultDatagridActions()

  const resource = useGetList<Command>(
    { page: 1, pageSize: 1000, sortField: "id" },
    {
      resource: "command",
    }
  )

  const commandsGroupOptions = useMemo(() => {
    let statusArray = resource.data?.items.map((command: Command) => command.status) || []
    let flattenArray: string[] = statusArray.filter(
      (v, i, a) => a.indexOf(v) === i
    ) as string[]

    let filterArray = flattenArray.map((opt) => ({
      name: opt,
      filter: {
        status: opt,
      },
    }))

    return filterArray
  }, [resource.data])

  return (
    <List>
      <ListHeader
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convollis nisl non convallis tincidunt."
        actions={[<CustomCreateButton />]}
        divider={false}
      />
      <EuiSpacer size="l" />
      <TabbedFilterGroups groups={[{ name: "All" }, ...commandsGroupOptions]} />
      <EuiSpacer size="xxl" />
      <FilterBar
        filters={[<TextFilter name="q" placeholder="Search..." alwaysOn grow />]}
      />
      <Datagrid
        columns={[
          <Column name="id" sortable>
            {(value) => <EuiLink {...linkProps(`/command/${value}`)}>{value}</EuiLink>}
          </Column>,
          <TextColumn name="reference" sortable />,
          <DateColumn name="date" sortable />,
          <Column name="reference" sortable />,
          <NumberColumn
            name="delivery_fees"
            sortable
            formatOptions={{ style: "currency", currency: "EUR" }}
          />,
          <NumberColumn
            name="total_ex_taxes"
            sortable
            formatOptions={{ style: "currency", currency: "EUR" }}
          />,
          <NumberColumn
            name="total"
            sortable
            formatOptions={{ style: "currency", currency: "EUR" }}
          />,
        ]}
        rowClick="edit"
        selectable
        actions={[defaultActions.view, defaultActions.edit, defaultActions.remove]}
        bulkActions={[defaultActions.remove]}
      />
    </List>
  )
}
