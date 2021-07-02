/**
 * GQLESS AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date type */
  Date: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export interface CustomerFilter {
  q?: Maybe<Scalars["String"]>
  ids?: Maybe<Array<Maybe<Scalars["ID"]>>>
  id?: Maybe<Scalars["ID"]>
  first_name?: Maybe<Scalars["String"]>
  last_name?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  address?: Maybe<Scalars["String"]>
  zipcode?: Maybe<Scalars["String"]>
  city?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  birthday?: Maybe<Scalars["String"]>
  first_seen?: Maybe<Scalars["Date"]>
  last_seen?: Maybe<Scalars["Date"]>
  has_ordered?: Maybe<Scalars["Boolean"]>
  latest_purchase?: Maybe<Scalars["String"]>
  has_newsletter?: Maybe<Scalars["Boolean"]>
  groups?: Maybe<Array<Maybe<Scalars["String"]>>>
  nb_commands?: Maybe<Scalars["Int"]>
  total_spent?: Maybe<Scalars["Float"]>
  id_neq?: Maybe<Scalars["ID"]>
  first_name_neq?: Maybe<Scalars["String"]>
  last_name_neq?: Maybe<Scalars["String"]>
  email_neq?: Maybe<Scalars["String"]>
  address_neq?: Maybe<Scalars["String"]>
  zipcode_neq?: Maybe<Scalars["String"]>
  city_neq?: Maybe<Scalars["String"]>
  avatar_neq?: Maybe<Scalars["String"]>
  birthday_neq?: Maybe<Scalars["String"]>
  first_seen_lt?: Maybe<Scalars["Date"]>
  first_seen_lte?: Maybe<Scalars["Date"]>
  first_seen_gt?: Maybe<Scalars["Date"]>
  first_seen_gte?: Maybe<Scalars["Date"]>
  first_seen_neq?: Maybe<Scalars["Date"]>
  last_seen_lt?: Maybe<Scalars["Date"]>
  last_seen_lte?: Maybe<Scalars["Date"]>
  last_seen_gt?: Maybe<Scalars["Date"]>
  last_seen_gte?: Maybe<Scalars["Date"]>
  last_seen_neq?: Maybe<Scalars["Date"]>
  latest_purchase_neq?: Maybe<Scalars["String"]>
  groups_neq?: Maybe<Array<Maybe<Scalars["String"]>>>
  nb_commands_lt?: Maybe<Scalars["Int"]>
  nb_commands_lte?: Maybe<Scalars["Int"]>
  nb_commands_gt?: Maybe<Scalars["Int"]>
  nb_commands_gte?: Maybe<Scalars["Int"]>
  nb_commands_neq?: Maybe<Scalars["Int"]>
  total_spent_lt?: Maybe<Scalars["Float"]>
  total_spent_lte?: Maybe<Scalars["Float"]>
  total_spent_gt?: Maybe<Scalars["Float"]>
  total_spent_gte?: Maybe<Scalars["Float"]>
  total_spent_neq?: Maybe<Scalars["Float"]>
}

export interface CategoryFilter {
  q?: Maybe<Scalars["String"]>
  ids?: Maybe<Array<Maybe<Scalars["ID"]>>>
  id?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  id_neq?: Maybe<Scalars["ID"]>
  name_neq?: Maybe<Scalars["String"]>
}

export interface ProductFilter {
  q?: Maybe<Scalars["String"]>
  ids?: Maybe<Array<Maybe<Scalars["ID"]>>>
  id?: Maybe<Scalars["ID"]>
  category_id?: Maybe<Scalars["ID"]>
  reference?: Maybe<Scalars["String"]>
  width?: Maybe<Scalars["Float"]>
  height?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
  thumbnail?: Maybe<Scalars["String"]>
  image?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  stock?: Maybe<Scalars["Int"]>
  id_neq?: Maybe<Scalars["ID"]>
  category_id_neq?: Maybe<Scalars["ID"]>
  reference_neq?: Maybe<Scalars["String"]>
  width_lt?: Maybe<Scalars["Float"]>
  width_lte?: Maybe<Scalars["Float"]>
  width_gt?: Maybe<Scalars["Float"]>
  width_gte?: Maybe<Scalars["Float"]>
  width_neq?: Maybe<Scalars["Float"]>
  height_lt?: Maybe<Scalars["Float"]>
  height_lte?: Maybe<Scalars["Float"]>
  height_gt?: Maybe<Scalars["Float"]>
  height_gte?: Maybe<Scalars["Float"]>
  height_neq?: Maybe<Scalars["Float"]>
  price_lt?: Maybe<Scalars["Float"]>
  price_lte?: Maybe<Scalars["Float"]>
  price_gt?: Maybe<Scalars["Float"]>
  price_gte?: Maybe<Scalars["Float"]>
  price_neq?: Maybe<Scalars["Float"]>
  thumbnail_neq?: Maybe<Scalars["String"]>
  image_neq?: Maybe<Scalars["String"]>
  description_neq?: Maybe<Scalars["String"]>
  stock_lt?: Maybe<Scalars["Int"]>
  stock_lte?: Maybe<Scalars["Int"]>
  stock_gt?: Maybe<Scalars["Int"]>
  stock_gte?: Maybe<Scalars["Int"]>
  stock_neq?: Maybe<Scalars["Int"]>
}

export interface CommandFilter {
  q?: Maybe<Scalars["String"]>
  ids?: Maybe<Array<Maybe<Scalars["ID"]>>>
  id?: Maybe<Scalars["ID"]>
  reference?: Maybe<Scalars["String"]>
  date?: Maybe<Scalars["Date"]>
  customer_id?: Maybe<Scalars["ID"]>
  basket?: Maybe<Scalars["JSON"]>
  total_ex_taxes?: Maybe<Scalars["Float"]>
  delivery_fees?: Maybe<Scalars["Float"]>
  tax_rate?: Maybe<Scalars["Float"]>
  taxes?: Maybe<Scalars["Float"]>
  total?: Maybe<Scalars["Float"]>
  status?: Maybe<Scalars["String"]>
  returned?: Maybe<Scalars["Boolean"]>
  id_neq?: Maybe<Scalars["ID"]>
  reference_neq?: Maybe<Scalars["String"]>
  date_lt?: Maybe<Scalars["Date"]>
  date_lte?: Maybe<Scalars["Date"]>
  date_gt?: Maybe<Scalars["Date"]>
  date_gte?: Maybe<Scalars["Date"]>
  date_neq?: Maybe<Scalars["Date"]>
  customer_id_neq?: Maybe<Scalars["ID"]>
  basket_neq?: Maybe<Scalars["JSON"]>
  total_ex_taxes_lt?: Maybe<Scalars["Float"]>
  total_ex_taxes_lte?: Maybe<Scalars["Float"]>
  total_ex_taxes_gt?: Maybe<Scalars["Float"]>
  total_ex_taxes_gte?: Maybe<Scalars["Float"]>
  total_ex_taxes_neq?: Maybe<Scalars["Float"]>
  delivery_fees_lt?: Maybe<Scalars["Float"]>
  delivery_fees_lte?: Maybe<Scalars["Float"]>
  delivery_fees_gt?: Maybe<Scalars["Float"]>
  delivery_fees_gte?: Maybe<Scalars["Float"]>
  delivery_fees_neq?: Maybe<Scalars["Float"]>
  tax_rate_lt?: Maybe<Scalars["Float"]>
  tax_rate_lte?: Maybe<Scalars["Float"]>
  tax_rate_gt?: Maybe<Scalars["Float"]>
  tax_rate_gte?: Maybe<Scalars["Float"]>
  tax_rate_neq?: Maybe<Scalars["Float"]>
  taxes_lt?: Maybe<Scalars["Float"]>
  taxes_lte?: Maybe<Scalars["Float"]>
  taxes_gt?: Maybe<Scalars["Float"]>
  taxes_gte?: Maybe<Scalars["Float"]>
  taxes_neq?: Maybe<Scalars["Float"]>
  total_lt?: Maybe<Scalars["Float"]>
  total_lte?: Maybe<Scalars["Float"]>
  total_gt?: Maybe<Scalars["Float"]>
  total_gte?: Maybe<Scalars["Float"]>
  total_neq?: Maybe<Scalars["Float"]>
  status_neq?: Maybe<Scalars["String"]>
}

export interface ReviewFilter {
  q?: Maybe<Scalars["String"]>
  ids?: Maybe<Array<Maybe<Scalars["ID"]>>>
  id?: Maybe<Scalars["ID"]>
  date?: Maybe<Scalars["Date"]>
  status?: Maybe<Scalars["String"]>
  command_id?: Maybe<Scalars["ID"]>
  product_id?: Maybe<Scalars["ID"]>
  customer_id?: Maybe<Scalars["ID"]>
  rating?: Maybe<Scalars["Int"]>
  comment?: Maybe<Scalars["String"]>
  id_neq?: Maybe<Scalars["ID"]>
  date_lt?: Maybe<Scalars["Date"]>
  date_lte?: Maybe<Scalars["Date"]>
  date_gt?: Maybe<Scalars["Date"]>
  date_gte?: Maybe<Scalars["Date"]>
  date_neq?: Maybe<Scalars["Date"]>
  status_neq?: Maybe<Scalars["String"]>
  command_id_neq?: Maybe<Scalars["ID"]>
  product_id_neq?: Maybe<Scalars["ID"]>
  customer_id_neq?: Maybe<Scalars["ID"]>
  rating_lt?: Maybe<Scalars["Int"]>
  rating_lte?: Maybe<Scalars["Int"]>
  rating_gt?: Maybe<Scalars["Int"]>
  rating_gte?: Maybe<Scalars["Int"]>
  rating_neq?: Maybe<Scalars["Int"]>
  comment_neq?: Maybe<Scalars["String"]>
}

export interface SettingFilter {
  q?: Maybe<Scalars["String"]>
  ids?: Maybe<Array<Maybe<Scalars["ID"]>>>
  id?: Maybe<Scalars["ID"]>
  configuration?: Maybe<Scalars["JSON"]>
  id_neq?: Maybe<Scalars["ID"]>
  configuration_neq?: Maybe<Scalars["JSON"]>
}

export interface CustomerInput {
  id: Scalars["ID"]
  first_name: Scalars["String"]
  last_name: Scalars["String"]
  email: Scalars["String"]
  address?: Maybe<Scalars["String"]>
  zipcode?: Maybe<Scalars["String"]>
  city?: Maybe<Scalars["String"]>
  avatar: Scalars["String"]
  birthday?: Maybe<Scalars["String"]>
  first_seen: Scalars["Date"]
  last_seen: Scalars["Date"]
  has_ordered: Scalars["Boolean"]
  latest_purchase?: Maybe<Scalars["String"]>
  has_newsletter: Scalars["Boolean"]
  groups: Array<Maybe<Scalars["String"]>>
  nb_commands: Scalars["Int"]
  total_spent: Scalars["Float"]
}

export interface CategoryInput {
  id: Scalars["ID"]
  name: Scalars["String"]
}

export interface ProductInput {
  id: Scalars["ID"]
  category_id: Scalars["ID"]
  reference: Scalars["String"]
  width: Scalars["Float"]
  height: Scalars["Float"]
  price: Scalars["Float"]
  thumbnail: Scalars["String"]
  image: Scalars["String"]
  description: Scalars["String"]
  stock: Scalars["Int"]
}

export interface CommandInput {
  id: Scalars["ID"]
  reference: Scalars["String"]
  date: Scalars["Date"]
  customer_id: Scalars["ID"]
  basket: Scalars["JSON"]
  total_ex_taxes: Scalars["Float"]
  delivery_fees: Scalars["Float"]
  tax_rate: Scalars["Float"]
  taxes: Scalars["Float"]
  total: Scalars["Float"]
  status: Scalars["String"]
  returned: Scalars["Boolean"]
}

export interface ReviewInput {
  id: Scalars["ID"]
  date: Scalars["Date"]
  status: Scalars["String"]
  command_id: Scalars["ID"]
  product_id: Scalars["ID"]
  customer_id: Scalars["ID"]
  rating: Scalars["Int"]
  comment: Scalars["String"]
}

export interface SettingInput {
  id: Scalars["ID"]
  configuration: Scalars["JSON"]
}

export const scalarsEnumsHash: import("gqless").ScalarsEnumsHash = {
  ID: true,
  String: true,
  Date: true,
  Boolean: true,
  Int: true,
  Float: true,
  JSON: true,
}
export const generatedSchema = {
  query: {
    __typename: { __type: "String!" },
    Customer: { __type: "Customer", __args: { id: "ID!" } },
    allCustomers: {
      __type: "[Customer]",
      __args: {
        page: "Int",
        perPage: "Int",
        sortField: "String",
        sortOrder: "String",
        filter: "CustomerFilter",
      },
    },
    _allCustomersMeta: {
      __type: "ListMetadata",
      __args: { page: "Int", perPage: "Int", filter: "CustomerFilter" },
    },
    Category: { __type: "Category", __args: { id: "ID!" } },
    allCategories: {
      __type: "[Category]",
      __args: {
        page: "Int",
        perPage: "Int",
        sortField: "String",
        sortOrder: "String",
        filter: "CategoryFilter",
      },
    },
    _allCategoriesMeta: {
      __type: "ListMetadata",
      __args: { page: "Int", perPage: "Int", filter: "CategoryFilter" },
    },
    Product: { __type: "Product", __args: { id: "ID!" } },
    allProducts: {
      __type: "[Product]",
      __args: {
        page: "Int",
        perPage: "Int",
        sortField: "String",
        sortOrder: "String",
        filter: "ProductFilter",
      },
    },
    _allProductsMeta: {
      __type: "ListMetadata",
      __args: { page: "Int", perPage: "Int", filter: "ProductFilter" },
    },
    Command: { __type: "Command", __args: { id: "ID!" } },
    allCommands: {
      __type: "[Command]",
      __args: {
        page: "Int",
        perPage: "Int",
        sortField: "String",
        sortOrder: "String",
        filter: "CommandFilter",
      },
    },
    _allCommandsMeta: {
      __type: "ListMetadata",
      __args: { page: "Int", perPage: "Int", filter: "CommandFilter" },
    },
    Review: { __type: "Review", __args: { id: "ID!" } },
    allReviews: {
      __type: "[Review]",
      __args: {
        page: "Int",
        perPage: "Int",
        sortField: "String",
        sortOrder: "String",
        filter: "ReviewFilter",
      },
    },
    _allReviewsMeta: {
      __type: "ListMetadata",
      __args: { page: "Int", perPage: "Int", filter: "ReviewFilter" },
    },
    Setting: { __type: "Setting", __args: { id: "ID!" } },
    allSettings: {
      __type: "[Setting]",
      __args: {
        page: "Int",
        perPage: "Int",
        sortField: "String",
        sortOrder: "String",
        filter: "SettingFilter",
      },
    },
    _allSettingsMeta: {
      __type: "ListMetadata",
      __args: { page: "Int", perPage: "Int", filter: "SettingFilter" },
    },
  },
  mutation: {
    __typename: { __type: "String!" },
    createCustomer: {
      __type: "Customer",
      __args: {
        first_name: "String!",
        last_name: "String!",
        email: "String!",
        address: "String",
        zipcode: "String",
        city: "String",
        avatar: "String!",
        birthday: "String",
        first_seen: "Date!",
        last_seen: "Date!",
        has_ordered: "Boolean!",
        latest_purchase: "String",
        has_newsletter: "Boolean!",
        groups: "[String]!",
        nb_commands: "Int!",
        total_spent: "Float!",
      },
    },
    createManyCustomer: { __type: "[Customer]", __args: { data: "[CustomerInput]" } },
    updateCustomer: {
      __type: "Customer",
      __args: {
        id: "ID!",
        first_name: "String",
        last_name: "String",
        email: "String",
        address: "String",
        zipcode: "String",
        city: "String",
        avatar: "String",
        birthday: "String",
        first_seen: "Date",
        last_seen: "Date",
        has_ordered: "Boolean",
        latest_purchase: "String",
        has_newsletter: "Boolean",
        groups: "[String]",
        nb_commands: "Int",
        total_spent: "Float",
      },
    },
    removeCustomer: { __type: "Customer", __args: { id: "ID!" } },
    createCategory: { __type: "Category", __args: { name: "String!" } },
    createManyCategory: { __type: "[Category]", __args: { data: "[CategoryInput]" } },
    updateCategory: { __type: "Category", __args: { id: "ID!", name: "String" } },
    removeCategory: { __type: "Category", __args: { id: "ID!" } },
    createProduct: {
      __type: "Product",
      __args: {
        category_id: "ID!",
        reference: "String!",
        width: "Float!",
        height: "Float!",
        price: "Float!",
        thumbnail: "String!",
        image: "String!",
        description: "String!",
        stock: "Int!",
      },
    },
    createManyProduct: { __type: "[Product]", __args: { data: "[ProductInput]" } },
    updateProduct: {
      __type: "Product",
      __args: {
        id: "ID!",
        category_id: "ID",
        reference: "String",
        width: "Float",
        height: "Float",
        price: "Float",
        thumbnail: "String",
        image: "String",
        description: "String",
        stock: "Int",
      },
    },
    removeProduct: { __type: "Product", __args: { id: "ID!" } },
    createCommand: {
      __type: "Command",
      __args: {
        reference: "String!",
        date: "Date!",
        customer_id: "ID!",
        basket: "JSON!",
        total_ex_taxes: "Float!",
        delivery_fees: "Float!",
        tax_rate: "Float!",
        taxes: "Float!",
        total: "Float!",
        status: "String!",
        returned: "Boolean!",
      },
    },
    createManyCommand: { __type: "[Command]", __args: { data: "[CommandInput]" } },
    updateCommand: {
      __type: "Command",
      __args: {
        id: "ID!",
        reference: "String",
        date: "Date",
        customer_id: "ID",
        basket: "JSON",
        total_ex_taxes: "Float",
        delivery_fees: "Float",
        tax_rate: "Float",
        taxes: "Float",
        total: "Float",
        status: "String",
        returned: "Boolean",
      },
    },
    removeCommand: { __type: "Command", __args: { id: "ID!" } },
    createReview: {
      __type: "Review",
      __args: {
        date: "Date!",
        status: "String!",
        command_id: "ID!",
        product_id: "ID!",
        customer_id: "ID!",
        rating: "Int!",
        comment: "String!",
      },
    },
    createManyReview: { __type: "[Review]", __args: { data: "[ReviewInput]" } },
    updateReview: {
      __type: "Review",
      __args: {
        id: "ID!",
        date: "Date",
        status: "String",
        command_id: "ID",
        product_id: "ID",
        customer_id: "ID",
        rating: "Int",
        comment: "String",
      },
    },
    removeReview: { __type: "Review", __args: { id: "ID!" } },
    createSetting: { __type: "Setting", __args: { configuration: "JSON!" } },
    createManySetting: { __type: "[Setting]", __args: { data: "[SettingInput]" } },
    updateSetting: { __type: "Setting", __args: { id: "ID!", configuration: "JSON" } },
    removeSetting: { __type: "Setting", __args: { id: "ID!" } },
  },
  subscription: {},
  Customer: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    first_name: { __type: "String!" },
    last_name: { __type: "String!" },
    email: { __type: "String!" },
    address: { __type: "String" },
    zipcode: { __type: "String" },
    city: { __type: "String" },
    avatar: { __type: "String!" },
    birthday: { __type: "String" },
    first_seen: { __type: "Date!" },
    last_seen: { __type: "Date!" },
    has_ordered: { __type: "Boolean!" },
    latest_purchase: { __type: "String" },
    has_newsletter: { __type: "Boolean!" },
    groups: { __type: "[String]!" },
    nb_commands: { __type: "Int!" },
    total_spent: { __type: "Float!" },
    Commands: { __type: "[Command]" },
    Reviews: { __type: "[Review]" },
  },
  Command: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    reference: { __type: "String!" },
    date: { __type: "Date!" },
    customer_id: { __type: "ID!" },
    basket: { __type: "JSON!" },
    total_ex_taxes: { __type: "Float!" },
    delivery_fees: { __type: "Float!" },
    tax_rate: { __type: "Float!" },
    taxes: { __type: "Float!" },
    total: { __type: "Float!" },
    status: { __type: "String!" },
    returned: { __type: "Boolean!" },
    Customer: { __type: "Customer" },
    Reviews: { __type: "[Review]" },
  },
  Review: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    date: { __type: "Date!" },
    status: { __type: "String!" },
    command_id: { __type: "ID!" },
    product_id: { __type: "ID!" },
    customer_id: { __type: "ID!" },
    rating: { __type: "Int!" },
    comment: { __type: "String!" },
    Command: { __type: "Command" },
    Product: { __type: "Product" },
    Customer: { __type: "Customer" },
  },
  Product: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    category_id: { __type: "ID!" },
    reference: { __type: "String!" },
    width: { __type: "Float!" },
    height: { __type: "Float!" },
    price: { __type: "Float!" },
    thumbnail: { __type: "String!" },
    image: { __type: "String!" },
    description: { __type: "String!" },
    stock: { __type: "Int!" },
    Category: { __type: "Category" },
    Reviews: { __type: "[Review]" },
  },
  Category: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    name: { __type: "String!" },
    Products: { __type: "[Product]" },
  },
  CustomerFilter: {
    q: { __type: "String" },
    ids: { __type: "[ID]" },
    id: { __type: "ID" },
    first_name: { __type: "String" },
    last_name: { __type: "String" },
    email: { __type: "String" },
    address: { __type: "String" },
    zipcode: { __type: "String" },
    city: { __type: "String" },
    avatar: { __type: "String" },
    birthday: { __type: "String" },
    first_seen: { __type: "Date" },
    last_seen: { __type: "Date" },
    has_ordered: { __type: "Boolean" },
    latest_purchase: { __type: "String" },
    has_newsletter: { __type: "Boolean" },
    groups: { __type: "[String]" },
    nb_commands: { __type: "Int" },
    total_spent: { __type: "Float" },
    id_neq: { __type: "ID" },
    first_name_neq: { __type: "String" },
    last_name_neq: { __type: "String" },
    email_neq: { __type: "String" },
    address_neq: { __type: "String" },
    zipcode_neq: { __type: "String" },
    city_neq: { __type: "String" },
    avatar_neq: { __type: "String" },
    birthday_neq: { __type: "String" },
    first_seen_lt: { __type: "Date" },
    first_seen_lte: { __type: "Date" },
    first_seen_gt: { __type: "Date" },
    first_seen_gte: { __type: "Date" },
    first_seen_neq: { __type: "Date" },
    last_seen_lt: { __type: "Date" },
    last_seen_lte: { __type: "Date" },
    last_seen_gt: { __type: "Date" },
    last_seen_gte: { __type: "Date" },
    last_seen_neq: { __type: "Date" },
    latest_purchase_neq: { __type: "String" },
    groups_neq: { __type: "[String]" },
    nb_commands_lt: { __type: "Int" },
    nb_commands_lte: { __type: "Int" },
    nb_commands_gt: { __type: "Int" },
    nb_commands_gte: { __type: "Int" },
    nb_commands_neq: { __type: "Int" },
    total_spent_lt: { __type: "Float" },
    total_spent_lte: { __type: "Float" },
    total_spent_gt: { __type: "Float" },
    total_spent_gte: { __type: "Float" },
    total_spent_neq: { __type: "Float" },
  },
  ListMetadata: { __typename: { __type: "String!" }, count: { __type: "Int" } },
  CategoryFilter: {
    q: { __type: "String" },
    ids: { __type: "[ID]" },
    id: { __type: "ID" },
    name: { __type: "String" },
    id_neq: { __type: "ID" },
    name_neq: { __type: "String" },
  },
  ProductFilter: {
    q: { __type: "String" },
    ids: { __type: "[ID]" },
    id: { __type: "ID" },
    category_id: { __type: "ID" },
    reference: { __type: "String" },
    width: { __type: "Float" },
    height: { __type: "Float" },
    price: { __type: "Float" },
    thumbnail: { __type: "String" },
    image: { __type: "String" },
    description: { __type: "String" },
    stock: { __type: "Int" },
    id_neq: { __type: "ID" },
    category_id_neq: { __type: "ID" },
    reference_neq: { __type: "String" },
    width_lt: { __type: "Float" },
    width_lte: { __type: "Float" },
    width_gt: { __type: "Float" },
    width_gte: { __type: "Float" },
    width_neq: { __type: "Float" },
    height_lt: { __type: "Float" },
    height_lte: { __type: "Float" },
    height_gt: { __type: "Float" },
    height_gte: { __type: "Float" },
    height_neq: { __type: "Float" },
    price_lt: { __type: "Float" },
    price_lte: { __type: "Float" },
    price_gt: { __type: "Float" },
    price_gte: { __type: "Float" },
    price_neq: { __type: "Float" },
    thumbnail_neq: { __type: "String" },
    image_neq: { __type: "String" },
    description_neq: { __type: "String" },
    stock_lt: { __type: "Int" },
    stock_lte: { __type: "Int" },
    stock_gt: { __type: "Int" },
    stock_gte: { __type: "Int" },
    stock_neq: { __type: "Int" },
  },
  CommandFilter: {
    q: { __type: "String" },
    ids: { __type: "[ID]" },
    id: { __type: "ID" },
    reference: { __type: "String" },
    date: { __type: "Date" },
    customer_id: { __type: "ID" },
    basket: { __type: "JSON" },
    total_ex_taxes: { __type: "Float" },
    delivery_fees: { __type: "Float" },
    tax_rate: { __type: "Float" },
    taxes: { __type: "Float" },
    total: { __type: "Float" },
    status: { __type: "String" },
    returned: { __type: "Boolean" },
    id_neq: { __type: "ID" },
    reference_neq: { __type: "String" },
    date_lt: { __type: "Date" },
    date_lte: { __type: "Date" },
    date_gt: { __type: "Date" },
    date_gte: { __type: "Date" },
    date_neq: { __type: "Date" },
    customer_id_neq: { __type: "ID" },
    basket_neq: { __type: "JSON" },
    total_ex_taxes_lt: { __type: "Float" },
    total_ex_taxes_lte: { __type: "Float" },
    total_ex_taxes_gt: { __type: "Float" },
    total_ex_taxes_gte: { __type: "Float" },
    total_ex_taxes_neq: { __type: "Float" },
    delivery_fees_lt: { __type: "Float" },
    delivery_fees_lte: { __type: "Float" },
    delivery_fees_gt: { __type: "Float" },
    delivery_fees_gte: { __type: "Float" },
    delivery_fees_neq: { __type: "Float" },
    tax_rate_lt: { __type: "Float" },
    tax_rate_lte: { __type: "Float" },
    tax_rate_gt: { __type: "Float" },
    tax_rate_gte: { __type: "Float" },
    tax_rate_neq: { __type: "Float" },
    taxes_lt: { __type: "Float" },
    taxes_lte: { __type: "Float" },
    taxes_gt: { __type: "Float" },
    taxes_gte: { __type: "Float" },
    taxes_neq: { __type: "Float" },
    total_lt: { __type: "Float" },
    total_lte: { __type: "Float" },
    total_gt: { __type: "Float" },
    total_gte: { __type: "Float" },
    total_neq: { __type: "Float" },
    status_neq: { __type: "String" },
  },
  ReviewFilter: {
    q: { __type: "String" },
    ids: { __type: "[ID]" },
    id: { __type: "ID" },
    date: { __type: "Date" },
    status: { __type: "String" },
    command_id: { __type: "ID" },
    product_id: { __type: "ID" },
    customer_id: { __type: "ID" },
    rating: { __type: "Int" },
    comment: { __type: "String" },
    id_neq: { __type: "ID" },
    date_lt: { __type: "Date" },
    date_lte: { __type: "Date" },
    date_gt: { __type: "Date" },
    date_gte: { __type: "Date" },
    date_neq: { __type: "Date" },
    status_neq: { __type: "String" },
    command_id_neq: { __type: "ID" },
    product_id_neq: { __type: "ID" },
    customer_id_neq: { __type: "ID" },
    rating_lt: { __type: "Int" },
    rating_lte: { __type: "Int" },
    rating_gt: { __type: "Int" },
    rating_gte: { __type: "Int" },
    rating_neq: { __type: "Int" },
    comment_neq: { __type: "String" },
  },
  Setting: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    configuration: { __type: "JSON!" },
  },
  SettingFilter: {
    q: { __type: "String" },
    ids: { __type: "[ID]" },
    id: { __type: "ID" },
    configuration: { __type: "JSON" },
    id_neq: { __type: "ID" },
    configuration_neq: { __type: "JSON" },
  },
  CustomerInput: {
    id: { __type: "ID!" },
    first_name: { __type: "String!" },
    last_name: { __type: "String!" },
    email: { __type: "String!" },
    address: { __type: "String" },
    zipcode: { __type: "String" },
    city: { __type: "String" },
    avatar: { __type: "String!" },
    birthday: { __type: "String" },
    first_seen: { __type: "Date!" },
    last_seen: { __type: "Date!" },
    has_ordered: { __type: "Boolean!" },
    latest_purchase: { __type: "String" },
    has_newsletter: { __type: "Boolean!" },
    groups: { __type: "[String]!" },
    nb_commands: { __type: "Int!" },
    total_spent: { __type: "Float!" },
  },
  CategoryInput: { id: { __type: "ID!" }, name: { __type: "String!" } },
  ProductInput: {
    id: { __type: "ID!" },
    category_id: { __type: "ID!" },
    reference: { __type: "String!" },
    width: { __type: "Float!" },
    height: { __type: "Float!" },
    price: { __type: "Float!" },
    thumbnail: { __type: "String!" },
    image: { __type: "String!" },
    description: { __type: "String!" },
    stock: { __type: "Int!" },
  },
  CommandInput: {
    id: { __type: "ID!" },
    reference: { __type: "String!" },
    date: { __type: "Date!" },
    customer_id: { __type: "ID!" },
    basket: { __type: "JSON!" },
    total_ex_taxes: { __type: "Float!" },
    delivery_fees: { __type: "Float!" },
    tax_rate: { __type: "Float!" },
    taxes: { __type: "Float!" },
    total: { __type: "Float!" },
    status: { __type: "String!" },
    returned: { __type: "Boolean!" },
  },
  ReviewInput: {
    id: { __type: "ID!" },
    date: { __type: "Date!" },
    status: { __type: "String!" },
    command_id: { __type: "ID!" },
    product_id: { __type: "ID!" },
    customer_id: { __type: "ID!" },
    rating: { __type: "Int!" },
    comment: { __type: "String!" },
  },
  SettingInput: { id: { __type: "ID!" }, configuration: { __type: "JSON!" } },
} as const

export interface Query {
  __typename: "Query" | undefined
  Customer: (args: { id: Scalars["ID"] }) => Maybe<Customer>
  allCustomers: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    sortField?: Maybe<Scalars["String"]>
    sortOrder?: Maybe<Scalars["String"]>
    filter?: Maybe<CustomerFilter>
  }) => Maybe<Array<Maybe<Customer>>>
  _allCustomersMeta: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    filter?: Maybe<CustomerFilter>
  }) => Maybe<ListMetadata>
  Category: (args: { id: Scalars["ID"] }) => Maybe<Category>
  allCategories: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    sortField?: Maybe<Scalars["String"]>
    sortOrder?: Maybe<Scalars["String"]>
    filter?: Maybe<CategoryFilter>
  }) => Maybe<Array<Maybe<Category>>>
  _allCategoriesMeta: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    filter?: Maybe<CategoryFilter>
  }) => Maybe<ListMetadata>
  Product: (args: { id: Scalars["ID"] }) => Maybe<Product>
  allProducts: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    sortField?: Maybe<Scalars["String"]>
    sortOrder?: Maybe<Scalars["String"]>
    filter?: Maybe<ProductFilter>
  }) => Maybe<Array<Maybe<Product>>>
  _allProductsMeta: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    filter?: Maybe<ProductFilter>
  }) => Maybe<ListMetadata>
  Command: (args: { id: Scalars["ID"] }) => Maybe<Command>
  allCommands: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    sortField?: Maybe<Scalars["String"]>
    sortOrder?: Maybe<Scalars["String"]>
    filter?: Maybe<CommandFilter>
  }) => Maybe<Array<Maybe<Command>>>
  _allCommandsMeta: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    filter?: Maybe<CommandFilter>
  }) => Maybe<ListMetadata>
  Review: (args: { id: Scalars["ID"] }) => Maybe<Review>
  allReviews: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    sortField?: Maybe<Scalars["String"]>
    sortOrder?: Maybe<Scalars["String"]>
    filter?: Maybe<ReviewFilter>
  }) => Maybe<Array<Maybe<Review>>>
  _allReviewsMeta: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    filter?: Maybe<ReviewFilter>
  }) => Maybe<ListMetadata>
  Setting: (args: { id: Scalars["ID"] }) => Maybe<Setting>
  allSettings: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    sortField?: Maybe<Scalars["String"]>
    sortOrder?: Maybe<Scalars["String"]>
    filter?: Maybe<SettingFilter>
  }) => Maybe<Array<Maybe<Setting>>>
  _allSettingsMeta: (args?: {
    page?: Maybe<Scalars["Int"]>
    perPage?: Maybe<Scalars["Int"]>
    filter?: Maybe<SettingFilter>
  }) => Maybe<ListMetadata>
}

export interface Mutation {
  __typename: "Mutation" | undefined
  createCustomer: (args: {
    first_name: Scalars["String"]
    last_name: Scalars["String"]
    email: Scalars["String"]
    address?: Maybe<Scalars["String"]>
    zipcode?: Maybe<Scalars["String"]>
    city?: Maybe<Scalars["String"]>
    avatar: Scalars["String"]
    birthday?: Maybe<Scalars["String"]>
    first_seen: Scalars["Date"]
    last_seen: Scalars["Date"]
    has_ordered: Scalars["Boolean"]
    latest_purchase?: Maybe<Scalars["String"]>
    has_newsletter: Scalars["Boolean"]
    groups: Array<Maybe<Scalars["String"]>>
    nb_commands: Scalars["Int"]
    total_spent: Scalars["Float"]
  }) => Maybe<Customer>
  createManyCustomer: (args?: {
    data?: Maybe<Array<Maybe<CustomerInput>>>
  }) => Maybe<Array<Maybe<Customer>>>
  updateCustomer: (args: {
    id: Scalars["ID"]
    first_name?: Maybe<Scalars["String"]>
    last_name?: Maybe<Scalars["String"]>
    email?: Maybe<Scalars["String"]>
    address?: Maybe<Scalars["String"]>
    zipcode?: Maybe<Scalars["String"]>
    city?: Maybe<Scalars["String"]>
    avatar?: Maybe<Scalars["String"]>
    birthday?: Maybe<Scalars["String"]>
    first_seen?: Maybe<Scalars["Date"]>
    last_seen?: Maybe<Scalars["Date"]>
    has_ordered?: Maybe<Scalars["Boolean"]>
    latest_purchase?: Maybe<Scalars["String"]>
    has_newsletter?: Maybe<Scalars["Boolean"]>
    groups?: Maybe<Array<Maybe<Scalars["String"]>>>
    nb_commands?: Maybe<Scalars["Int"]>
    total_spent?: Maybe<Scalars["Float"]>
  }) => Maybe<Customer>
  removeCustomer: (args: { id: Scalars["ID"] }) => Maybe<Customer>
  createCategory: (args: { name: Scalars["String"] }) => Maybe<Category>
  createManyCategory: (args?: {
    data?: Maybe<Array<Maybe<CategoryInput>>>
  }) => Maybe<Array<Maybe<Category>>>
  updateCategory: (args: {
    id: Scalars["ID"]
    name?: Maybe<Scalars["String"]>
  }) => Maybe<Category>
  removeCategory: (args: { id: Scalars["ID"] }) => Maybe<Category>
  createProduct: (args: {
    category_id: Scalars["ID"]
    reference: Scalars["String"]
    width: Scalars["Float"]
    height: Scalars["Float"]
    price: Scalars["Float"]
    thumbnail: Scalars["String"]
    image: Scalars["String"]
    description: Scalars["String"]
    stock: Scalars["Int"]
  }) => Maybe<Product>
  createManyProduct: (args?: {
    data?: Maybe<Array<Maybe<ProductInput>>>
  }) => Maybe<Array<Maybe<Product>>>
  updateProduct: (args: {
    id: Scalars["ID"]
    category_id?: Maybe<Scalars["ID"]>
    reference?: Maybe<Scalars["String"]>
    width?: Maybe<Scalars["Float"]>
    height?: Maybe<Scalars["Float"]>
    price?: Maybe<Scalars["Float"]>
    thumbnail?: Maybe<Scalars["String"]>
    image?: Maybe<Scalars["String"]>
    description?: Maybe<Scalars["String"]>
    stock?: Maybe<Scalars["Int"]>
  }) => Maybe<Product>
  removeProduct: (args: { id: Scalars["ID"] }) => Maybe<Product>
  createCommand: (args: {
    reference: Scalars["String"]
    date: Scalars["Date"]
    customer_id: Scalars["ID"]
    basket: Scalars["JSON"]
    total_ex_taxes: Scalars["Float"]
    delivery_fees: Scalars["Float"]
    tax_rate: Scalars["Float"]
    taxes: Scalars["Float"]
    total: Scalars["Float"]
    status: Scalars["String"]
    returned: Scalars["Boolean"]
  }) => Maybe<Command>
  createManyCommand: (args?: {
    data?: Maybe<Array<Maybe<CommandInput>>>
  }) => Maybe<Array<Maybe<Command>>>
  updateCommand: (args: {
    id: Scalars["ID"]
    reference?: Maybe<Scalars["String"]>
    date?: Maybe<Scalars["Date"]>
    customer_id?: Maybe<Scalars["ID"]>
    basket?: Maybe<Scalars["JSON"]>
    total_ex_taxes?: Maybe<Scalars["Float"]>
    delivery_fees?: Maybe<Scalars["Float"]>
    tax_rate?: Maybe<Scalars["Float"]>
    taxes?: Maybe<Scalars["Float"]>
    total?: Maybe<Scalars["Float"]>
    status?: Maybe<Scalars["String"]>
    returned?: Maybe<Scalars["Boolean"]>
  }) => Maybe<Command>
  removeCommand: (args: { id: Scalars["ID"] }) => Maybe<Command>
  createReview: (args: {
    date: Scalars["Date"]
    status: Scalars["String"]
    command_id: Scalars["ID"]
    product_id: Scalars["ID"]
    customer_id: Scalars["ID"]
    rating: Scalars["Int"]
    comment: Scalars["String"]
  }) => Maybe<Review>
  createManyReview: (args?: {
    data?: Maybe<Array<Maybe<ReviewInput>>>
  }) => Maybe<Array<Maybe<Review>>>
  updateReview: (args: {
    id: Scalars["ID"]
    date?: Maybe<Scalars["Date"]>
    status?: Maybe<Scalars["String"]>
    command_id?: Maybe<Scalars["ID"]>
    product_id?: Maybe<Scalars["ID"]>
    customer_id?: Maybe<Scalars["ID"]>
    rating?: Maybe<Scalars["Int"]>
    comment?: Maybe<Scalars["String"]>
  }) => Maybe<Review>
  removeReview: (args: { id: Scalars["ID"] }) => Maybe<Review>
  createSetting: (args: { configuration: Scalars["JSON"] }) => Maybe<Setting>
  createManySetting: (args?: {
    data?: Maybe<Array<Maybe<SettingInput>>>
  }) => Maybe<Array<Maybe<Setting>>>
  updateSetting: (args: {
    id: Scalars["ID"]
    configuration?: Maybe<Scalars["JSON"]>
  }) => Maybe<Setting>
  removeSetting: (args: { id: Scalars["ID"] }) => Maybe<Setting>
}

export interface Subscription {
  __typename: "Subscription" | undefined
}

export interface Customer {
  __typename: "Customer" | undefined
  id: ScalarsEnums["ID"]
  first_name: ScalarsEnums["String"]
  last_name: ScalarsEnums["String"]
  email: ScalarsEnums["String"]
  address?: Maybe<ScalarsEnums["String"]>
  zipcode?: Maybe<ScalarsEnums["String"]>
  city?: Maybe<ScalarsEnums["String"]>
  avatar: ScalarsEnums["String"]
  birthday?: Maybe<ScalarsEnums["String"]>
  first_seen: ScalarsEnums["Date"]
  last_seen: ScalarsEnums["Date"]
  has_ordered: ScalarsEnums["Boolean"]
  latest_purchase?: Maybe<ScalarsEnums["String"]>
  has_newsletter: ScalarsEnums["Boolean"]
  groups: Array<Maybe<ScalarsEnums["String"]>>
  nb_commands: ScalarsEnums["Int"]
  total_spent: ScalarsEnums["Float"]
  Commands?: Maybe<Array<Maybe<Command>>>
  Reviews?: Maybe<Array<Maybe<Review>>>
}

export interface Command {
  __typename: "Command" | undefined
  id: ScalarsEnums["ID"]
  reference: ScalarsEnums["String"]
  date: ScalarsEnums["Date"]
  customer_id: ScalarsEnums["ID"]
  basket: ScalarsEnums["JSON"]
  total_ex_taxes: ScalarsEnums["Float"]
  delivery_fees: ScalarsEnums["Float"]
  tax_rate: ScalarsEnums["Float"]
  taxes: ScalarsEnums["Float"]
  total: ScalarsEnums["Float"]
  status: ScalarsEnums["String"]
  returned: ScalarsEnums["Boolean"]
  Customer?: Maybe<Customer>
  Reviews?: Maybe<Array<Maybe<Review>>>
}

export interface Review {
  __typename: "Review" | undefined
  id: ScalarsEnums["ID"]
  date: ScalarsEnums["Date"]
  status: ScalarsEnums["String"]
  command_id: ScalarsEnums["ID"]
  product_id: ScalarsEnums["ID"]
  customer_id: ScalarsEnums["ID"]
  rating: ScalarsEnums["Int"]
  comment: ScalarsEnums["String"]
  Command?: Maybe<Command>
  Product?: Maybe<Product>
  Customer?: Maybe<Customer>
}

export interface Product {
  __typename: "Product" | undefined
  id: ScalarsEnums["ID"]
  category_id: ScalarsEnums["ID"]
  reference: ScalarsEnums["String"]
  width: ScalarsEnums["Float"]
  height: ScalarsEnums["Float"]
  price: ScalarsEnums["Float"]
  thumbnail: ScalarsEnums["String"]
  image: ScalarsEnums["String"]
  description: ScalarsEnums["String"]
  stock: ScalarsEnums["Int"]
  Category?: Maybe<Category>
  Reviews?: Maybe<Array<Maybe<Review>>>
}

export interface Category {
  __typename: "Category" | undefined
  id: ScalarsEnums["ID"]
  name: ScalarsEnums["String"]
  Products?: Maybe<Array<Maybe<Product>>>
}

export interface ListMetadata {
  __typename: "ListMetadata" | undefined
  count?: Maybe<ScalarsEnums["Int"]>
}

export interface Setting {
  __typename: "Setting" | undefined
  id: ScalarsEnums["ID"]
  configuration: ScalarsEnums["JSON"]
}

export interface SchemaObjectTypes {
  Query: Query
  Mutation: Mutation
  Subscription: Subscription
  Customer: Customer
  Command: Command
  Review: Review
  Product: Product
  Category: Category
  ListMetadata: ListMetadata
  Setting: Setting
}
export type SchemaObjectTypesNames =
  | "Query"
  | "Mutation"
  | "Subscription"
  | "Customer"
  | "Command"
  | "Review"
  | "Product"
  | "Category"
  | "ListMetadata"
  | "Setting"

export interface GeneratedSchema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined
}

export interface ScalarsEnums extends MakeNullable<Scalars> {}
