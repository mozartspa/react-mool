import { EuiSpacer } from "@elastic/eui"
import { useGetList } from "@react-mool/core"
import {
  CreateButton,
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
import { Customer } from "../gqless"

export const CustomerList = () => {
  const defaultActions = useDefaultDatagridActions()

  const resource = useGetList<Customer>(
    { page: 1, pageSize: 1000, sortField: "id" },
    {
      resource: "customer",
    }
  )

  const customersGroupOptions = useMemo(() => {
    let groupsArray =
      resource.data?.items.map((customer: Customer) => customer.groups) || []
    let flattenArray: string[] = groupsArray
      .flat()
      .filter((v, i, a) => a.indexOf(v) === i) as string[]

    let filterArray = flattenArray.map((opt) => ({
      name: opt,
      filter: {
        groups: opt,
      },
    }))

    return filterArray
  }, [resource.data])

  return (
    <List>
      <ListHeader
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convollis nisl non convallis tincidunt."
        actions={[<CreateButton />]}
        divider={false}
      />
      <EuiSpacer size="l" />
      <TabbedFilterGroups groups={[{ name: "All" }, ...customersGroupOptions]} />
      <EuiSpacer size="xxl" />
      <FilterBar
        filters={[<TextFilter name="q" placeholder="Search..." alwaysOn grow />]}
      />
      <Datagrid
        columns={[
          <TextColumn name="id" sortable />,
          <TextColumn name="first_name" sortable />,
          <TextColumn name="last_name" sortable />,
          <TextColumn name="email" />,
          <TextColumn name="zipcode" sortable />,
          <TextColumn name="city" sortable />,
          <DateColumn name="birthday" sortable />,
          <DateColumn name="first_seen" sortable />,
          <DateColumn name="last_seen" sortable />,
          <NumberColumn name="total_spent" sortable />,
        ]}
        rowClick="edit"
        selectable
        actions={[defaultActions.view, defaultActions.edit, defaultActions.remove]}
        bulkActions={[defaultActions.remove]}
      />
    </List>
  )
}
