import {
  EuiButton,
  EuiButtonGroup,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from "@elastic/eui"
import {
  CreateBase,
  DetailBase,
  EditBase,
  ListBase,
  useDelete,
  useLocale,
  useNotify,
  useRedirect,
  useRedirectLink,
  useSetLocale,
  useTranslate,
} from "@react-mool/core"
import { TextInput } from "@react-mool/eui"
import { observer } from "mobx-react-lite"
import { Fragment } from "react"
import { useQueryClient } from "react-query"
import { GeneratedSchema, Product } from "../gqless"

type ProductUpdateInput = Omit<
  Parameters<GeneratedSchema["mutation"]["updateProduct"]>[0],
  "id"
>

export const ProductDetail = () => {
  return (
    <DetailBase>
      {({ record }) => (
        <>
          <pre>{JSON.stringify(record, null, 2)}</pre>
        </>
      )}
    </DetailBase>
  )
}

function LangTest() {
  const translate = useTranslate()
  const locale = useLocale()
  const setLocale = useSetLocale()

  const items = ["open", "close", "show"].map((key) => ({
    title: key,
    description: translate(key),
  }))

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={true}>
        <EuiDescriptionList listItems={items} textStyle="reverse" />
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonGroup
          legend="Choose language"
          options={[
            {
              id: "en",
              label: "EN",
            },
            {
              id: "fr",
              label: "FR",
            },
            {
              id: "it",
              label: "IT",
            },
          ]}
          idSelected={locale}
          onChange={(id) => setLocale(id)}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export const ProductList = () => {
  const deleteMutation = useDelete()
  const queryClient = useQueryClient()

  const notify = useNotify()
  const redirect = useRedirect()
  const redirectLink = useRedirectLink()

  return (
    <ListBase initialPageSize={10}>
      {({ items, total, page, setPage }) => (
        <>
          <LangTest />
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

export const ProductCreate = observer(() => {
  const initialValues = {
    category_id: "1",
    description: "",
    height: 100,
    image: "",
    price: 0,
    reference: "",
    stock: 0,
    thumbnail: "",
    width: 0,
  }

  return (
    <CreateBase initialValues={initialValues} redirectTo="detail">
      {({ form }) => (
        <>
          <TextInput name="reference" />
          <EuiSpacer />
          <EuiButton onClick={form.submit} isLoading={form.isSubmitting}>
            Create
          </EuiButton>
        </>
      )}
    </CreateBase>
  )
})

function initialValues(data: Product): ProductUpdateInput {
  return {
    category_id: data.category_id,
    description: data.description,
    height: data.height,
    image: data.image,
    price: data.price,
    reference: data.reference,
    stock: data.stock,
    thumbnail: data.thumbnail,
    width: data.width,
  }
}

export const ProductUpdate = observer(() => {
  return (
    <EditBase initialValues={initialValues}>
      {({ form }) => {
        return (
          <>
            <TextInput name="reference" />
            <TextInput name="category_id" />
            <TextInput name="thumbnail" />
            <TextInput name="image" />
            <TextInput name="description" />
            <TextInput name="height" type="number" />
            <TextInput name="width" type="number" />
            <TextInput name="price" type="number" />
            <TextInput name="stock" type="number" />
            <EuiSpacer />
            <EuiButton
              onClick={form.submit}
              disabled={!form.isDirty}
              isLoading={form.isSubmitting}
            >
              Save
            </EuiButton>
            {/*<DebugForm />*/}
          </>
        )
      }}
    </EditBase>
  )
})
