import {
  EuiButton,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiSpacer,
} from "@elastic/eui"
import {
  ListBase,
  useAddFilter,
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
  FilterBar,
  List,
  ListHeader,
  TabbedFilterGroups,
  TextFilter,
  useDefaultDatagridActions,
} from "@react-mool/eui"
import { Fragment, useState } from "react"
import { useQueryClient } from "react-query"
import { ProductFilter } from "../gqless"

const Toggler = ({ children }: any) => {
  const [show, setShow] = useState(true)

  const button = (
    <EuiButton onClick={() => setShow(!show)}>{show ? "Off" : "On"}</EuiButton>
  )

  return (
    <EuiFlexGroup>
      <EuiFlexItem>{show ? children : null}</EuiFlexItem>
      <EuiFlexItem>{button}</EuiFlexItem>
    </EuiFlexGroup>
  )
}

const EasyFilter = () => {
  const [filter, setFilter] = useAddFilter<ProductFilter>({ q: "" }, { debounce: true })

  return (
    <EuiFieldSearch
      value={filter?.q || ""}
      onChange={(ev) => {
        setFilter({ q: ev.target.value })
      }}
    />
  )
}

export const ProductList = () => {
  const linkProps = useLinkProps()
  const defaultActions = useDefaultDatagridActions()

  return (
    <List>
      <ListHeader
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convallis nisl non convallis tincidunt."
        actions={[<CreateButton />]}
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
      {/*<FilterBar
        filters={[
          {
            name: "q",
            grow: true,
            render: (field) => <EuiFieldSearch {...field.input} fullWidth />,
          },
          {
            name: "price_lt",
            grow: false,
            render: (field) => (
              <EuiFieldSearch {...field.input} fullWidth type="number" />
            ),
          },
        ]}
      />*/}
      <FilterBar
        filters={[
          <TextFilter name="q" placeholder="Search..." alwaysOn grow />,
          <TextFilter name="price_lt" placeholder="Price lower than" type="number" />,
        ]}
      />
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
