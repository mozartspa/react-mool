import {
  EuiButton,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiLink,
  EuiSpacer,
} from "@elastic/eui"
import {
  ListBase,
  useDelete,
  useGetList,
  useLinkProps,
  useNotify,
  useRedirect,
  useRedirectLink,
  useTranslate,
} from "@react-mool/core"
import {
  BreadcrumbsItem,
  Column,
  CreateButton,
  Datagrid,
  FilterBar,
  List,
  ListHeader,
  NumberFilter,
  SelectFilter,
  SelectOption,
  TabbedFilterGroups,
  TextFilter,
  useDefaultDatagridActions,
} from "@react-mool/eui"
import { Fragment, useMemo } from "react"
import { useQueryClient } from "react-query"
import { Category } from "../gqless"
import { t } from "../i18n/en"

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
      <FilterBar
        filters={[
          <TextFilter name="q" placeholder="Search..." alwaysOn grow />,
          <SelectFilter
            name="category_id"
            placeholder={translate(t.resources.product.filter.category_id_placeholder)}
            options={categoryOptions || []}
            searchable
          />,
          <NumberFilter name="price_lt" placeholder="Price lower than" />,
        ]}
      />
      <Datagrid
        columns={[
          <Column name="id" sortable />,
          <Column name="Category" sortable="category_id">
            {(value) => (
              <EuiLink {...linkProps(`/product/${value?.id}`)}>{value?.name}</EuiLink>
            )}
          </Column>,
          <Column name="reference" sortable />,
          <Column name="width" sortable align="right" />,
          <Column name="height" sortable align="right" />,
          <Column name="price" sortable />,
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
