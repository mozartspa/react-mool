import { EuiLink, EuiSpacer } from "@elastic/eui"
import { useLinkProps } from "@react-mool/core"
import {
  Column,
  CreateButton,
  Datagrid,
  List,
  ListHeader,
  TextColumn,
  useDefaultDatagridActions,
} from "@react-mool/eui"

export const CategoryList = () => {
  const linkProps = useLinkProps()
  const defaultActions = useDefaultDatagridActions()

  return (
    <List>
      <ListHeader
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convollis nisl non convallis tincidunt."
        actions={[<CreateButton />]}
        divider={false}
      />
      <EuiSpacer size="l" />
      <Datagrid
        columns={[
          <TextColumn name="id" sortable />,
          <Column name="name" sortable>
            {(value, record) => (
              <EuiLink {...linkProps(`/category/${record.id}`)}>{value}</EuiLink>
            )}
          </Column>,
          <Column name="Products">{(value) => value.length}</Column>,
        ]}
        rowClick="edit"
        selectable
        actions={[defaultActions.view, defaultActions.edit, defaultActions.remove]}
        bulkActions={[defaultActions.remove]}
      />
    </List>
  )
}
