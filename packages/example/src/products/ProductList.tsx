import { EuiLink, EuiSpacer } from "@elastic/eui"
import { useGetList, useLinkProps, useTranslate } from "@react-mool/core"
import {
  Column,
  CreateButton,
  Datagrid,
  FilterBar,
  List,
  ListHeader,
  NumberColumn,
  SelectOption,
  TabbedFilterGroups,
  TextColumn,
  TextFilter,
  useDefaultDatagridActions,
} from "@react-mool/eui"
import { useMemo } from "react"
import { Category } from "../gqless"

export const ProductList = () => {
  const linkProps = useLinkProps()
  const defaultActions = useDefaultDatagridActions()
  const translate = useTranslate()

  const categoryList = useGetList<Category>(
    { page: 1, pageSize: 1000, sortField: "name" },
    {
      resource: "category",
    }
  )

  const categoryOptions = useMemo(() => {
    return categoryList.data?.items.map((item) => {
      const opt: SelectOption = {
        value: item.id,
        label: item.name || "",
      }
      return opt
    })
  }, [categoryList.data])

  return (
    <List>
      <ListHeader
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convollis nisl non convallis tincidunt."
        actions={[<CreateButton />]}
        divider={false}
      />
      <EuiSpacer size="l" />
      <TabbedFilterGroups
        groups={[
          { name: "All" },
          { name: "Cheap", filter: { price_lt: 40 } },
          { name: "Medium", filter: { price_gte: 40, price_lt: 80 } },
          { name: "Expensive", filter: { price_gte: 80 } },
          { name: "Night", filter: { q: "night" } },
        ]}
      />
      <EuiSpacer size="xxl" />
      <FilterBar
        filters={[<TextFilter name="q" placeholder="Search..." alwaysOn grow />]}
      />
      <Datagrid
        columns={[
          <TextColumn name="id" sortable />,
          <Column name="Category" sortable="category_id">
            {(value) => (
              <EuiLink {...linkProps(`/product/${value?.id}`)}>{value?.name}</EuiLink>
            )}
          </Column>,
          <Column name="reference" sortable />,
          <Column name="width" sortable align="right" />,
          <Column name="height" sortable align="right" />,
          <NumberColumn
            name="price"
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
