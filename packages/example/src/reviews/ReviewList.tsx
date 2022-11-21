import { EuiLink, EuiSpacer } from "@elastic/eui"
import { useLinkProps } from "@react-mool/core"
import {
  Column,
  CreateButton,
  Datagrid,
  DateColumn,
  List,
  ListHeader,
  TextColumn,
  useDefaultDatagridActions,
} from "@react-mool/eui"

export const ReviewList = () => {
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
          <Column name="id" sortable align="center">
            {(value) => <EuiLink {...linkProps(`/review/${value}`)}>{value}</EuiLink>}
          </Column>,
          <DateColumn name="date" sortable align="center" />,
          <TextColumn name="comment" sortable width="50%" />,
          <TextColumn name="status" sortable align="center" />,
        ]}
        rowClick="edit"
        selectable
        actions={[defaultActions.view, defaultActions.edit, defaultActions.remove]}
        bulkActions={[defaultActions.remove]}
      />
    </List>
  )
}
