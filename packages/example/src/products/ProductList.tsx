import {
  EuiBadge,
  EuiButton,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiLink,
  EuiSpacer,
  EuiTab,
  EuiTabs,
} from "@elastic/eui"
import {
  ListBase,
  useDelete,
  useLinkProps,
  useNotify,
  useRedirect,
  useRedirectLink,
} from "@react-mool/core"
import {
  BreadcrumbsItem,
  CreateButton,
  Datagrid,
  List,
  ListHeader,
  useDefaultDatagridActions,
} from "@react-mool/eui"
import { Fragment } from "react"
import { useQueryClient } from "react-query"

export const ProductList = () => {
  const linkProps = useLinkProps()
  const defaultActions = useDefaultDatagridActions()

  return (
    <List>
      <ListHeader
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convallis nisl non convallis tincidunt."
        actions={[<CreateButton />]}
      />
      <EuiSpacer size="s" />
      <EuiTabs display="default">
        <EuiTab isSelected>
          All <EuiBadge color="hollow">58</EuiBadge>{" "}
        </EuiTab>
        <EuiTab>Some</EuiTab>
        <EuiTab>Others</EuiTab>
      </EuiTabs>
      <EuiSpacer size="l" />
      <Datagrid
        columns={[
          { name: "id", sortable: true },
          {
            name: "Category",
            sortable: "category_id",
            render: (value: any) => (
              <EuiLink {...linkProps(`/product/${value?.id}`)}>{value?.name}</EuiLink>
            ),
          },
          { name: "reference", sortable: true },
          { name: "width", sortable: true, align: "right" },
          { name: "height", sortable: true, align: "right" },
          { name: "price", sortable: true, align: "right" },
        ]}
        rowClick="detail"
        selectable
        actions={[defaultActions.view, defaultActions.edit, defaultActions.remove]}
        bulkActions={[defaultActions.remove]}
      />
    </List>
  )
}

export const ProductListOld = () => {
  const deleteMutation = useDelete()
  const queryClient = useQueryClient()

  const notify = useNotify()
  const redirect = useRedirect()
  const redirectLink = useRedirectLink()

  return (
    <ListBase initialPageSize={10}>
      {({ items, total, page, setPage }) => (
        <>
          <BreadcrumbsItem>Products</BreadcrumbsItem>
          <EuiSpacer />
          <EuiButton {...redirectLink("create")} iconType="plus">
            Add
          </EuiButton>
          <EuiSpacer />
          <p>Total: {total}</p>
          <EuiSpacer />
          <EuiDescriptionList>
            {items.map((item) => (
              <Fragment key={item.id}>
                <EuiDescriptionListTitle>{item.reference}</EuiDescriptionListTitle>
                <EuiDescriptionListDescription>
                  <a {...redirectLink("edit", { id: item.id })}>Update</a>
                  {" | "}
                  <a {...redirectLink("detail", { id: item.id })}>Detail</a>
                  {" | "}
                  <a
                    href="#delete"
                    onClick={(ev) => {
                      ev.preventDefault()
                      deleteMutation.mutateAsync({ id: String(item.id) }).then(() => {
                        console.log("removed!")
                        queryClient.invalidateQueries("product")
                      })
                    }}
                  >
                    Delete
                  </a>
                  {" | "}
                  <a
                    href="#notify"
                    onClick={(ev) => {
                      ev.preventDefault()
                      notify(item.reference)
                    }}
                  >
                    Notify
                  </a>
                  {" | "}
                  <a
                    href="#go"
                    onClick={(ev) => {
                      ev.preventDefault()
                      redirect("detail", { id: item.id })
                    }}
                  >
                    Go
                  </a>
                </EuiDescriptionListDescription>
              </Fragment>
            ))}
          </EuiDescriptionList>
          <p>Page: {page}</p>
          <EuiButton onClick={() => setPage(page - 1)}>Prev</EuiButton>{" "}
          <EuiButton onClick={() => setPage(page + 1)}>Next</EuiButton>
        </>
      )}
    </ListBase>
  )
}
