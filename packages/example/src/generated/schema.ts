import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Date: any,
    Boolean: boolean,
    Int: number,
    Float: number,
    JSON: any,
}

export interface Query {
    Customer?: Customer
    allCustomers?: (Customer | undefined)[]
    _allCustomersMeta?: ListMetadata
    Category?: Category
    allCategories?: (Category | undefined)[]
    _allCategoriesMeta?: ListMetadata
    Product?: Product
    allProducts?: (Product | undefined)[]
    _allProductsMeta?: ListMetadata
    Command?: Command
    allCommands?: (Command | undefined)[]
    _allCommandsMeta?: ListMetadata
    Review?: Review
    allReviews?: (Review | undefined)[]
    _allReviewsMeta?: ListMetadata
    Setting?: Setting
    allSettings?: (Setting | undefined)[]
    _allSettingsMeta?: ListMetadata
    __typename: 'Query'
}

export interface Customer {
    id: Scalars['ID']
    first_name: Scalars['String']
    last_name: Scalars['String']
    email: Scalars['String']
    address?: Scalars['String']
    zipcode?: Scalars['String']
    city?: Scalars['String']
    avatar: Scalars['String']
    birthday?: Scalars['String']
    first_seen: Scalars['Date']
    last_seen: Scalars['Date']
    has_ordered: Scalars['Boolean']
    latest_purchase?: Scalars['String']
    has_newsletter: Scalars['Boolean']
    groups: (Scalars['String'] | undefined)[]
    nb_commands: Scalars['Int']
    total_spent: Scalars['Float']
    Commands?: (Command | undefined)[]
    Reviews?: (Review | undefined)[]
    __typename: 'Customer'
}

export interface Command {
    id: Scalars['ID']
    reference: Scalars['String']
    date: Scalars['Date']
    customer_id: Scalars['ID']
    basket: Scalars['JSON']
    total_ex_taxes: Scalars['Float']
    delivery_fees: Scalars['Float']
    tax_rate: Scalars['Float']
    taxes: Scalars['Float']
    total: Scalars['Float']
    status: Scalars['String']
    returned: Scalars['Boolean']
    Customer?: Customer
    Reviews?: (Review | undefined)[]
    __typename: 'Command'
}

export interface Review {
    id: Scalars['ID']
    date: Scalars['Date']
    status: Scalars['String']
    command_id: Scalars['ID']
    product_id: Scalars['ID']
    customer_id: Scalars['ID']
    rating: Scalars['Int']
    comment: Scalars['String']
    Command?: Command
    Product?: Product
    Customer?: Customer
    __typename: 'Review'
}

export interface Product {
    id: Scalars['ID']
    category_id: Scalars['ID']
    reference: Scalars['String']
    width: Scalars['Float']
    height: Scalars['Float']
    price: Scalars['Float']
    thumbnail: Scalars['String']
    image: Scalars['String']
    description: Scalars['String']
    stock: Scalars['Int']
    Category?: Category
    Reviews?: (Review | undefined)[]
    __typename: 'Product'
}

export interface Category {
    id: Scalars['ID']
    name: Scalars['String']
    Products?: (Product | undefined)[]
    __typename: 'Category'
}

export interface ListMetadata {
    count?: Scalars['Int']
    __typename: 'ListMetadata'
}

export interface Setting {
    id: Scalars['ID']
    configuration: Scalars['JSON']
    __typename: 'Setting'
}

export interface Mutation {
    createCustomer?: Customer
    createManyCustomer?: (Customer | undefined)[]
    updateCustomer?: Customer
    removeCustomer?: Customer
    createCategory?: Category
    createManyCategory?: (Category | undefined)[]
    updateCategory?: Category
    removeCategory?: Category
    createProduct?: Product
    createManyProduct?: (Product | undefined)[]
    updateProduct?: Product
    removeProduct?: Product
    createCommand?: Command
    createManyCommand?: (Command | undefined)[]
    updateCommand?: Command
    removeCommand?: Command
    createReview?: Review
    createManyReview?: (Review | undefined)[]
    updateReview?: Review
    removeReview?: Review
    createSetting?: Setting
    createManySetting?: (Setting | undefined)[]
    updateSetting?: Setting
    removeSetting?: Setting
    __typename: 'Mutation'
}

export interface QueryRequest{
    Customer?: [{id: Scalars['ID']},CustomerRequest]
    allCustomers?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (CustomerFilter | null)},CustomerRequest] | CustomerRequest
    _allCustomersMeta?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (CustomerFilter | null)},ListMetadataRequest] | ListMetadataRequest
    Category?: [{id: Scalars['ID']},CategoryRequest]
    allCategories?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (CategoryFilter | null)},CategoryRequest] | CategoryRequest
    _allCategoriesMeta?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (CategoryFilter | null)},ListMetadataRequest] | ListMetadataRequest
    Product?: [{id: Scalars['ID']},ProductRequest]
    allProducts?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (ProductFilter | null)},ProductRequest] | ProductRequest
    _allProductsMeta?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (ProductFilter | null)},ListMetadataRequest] | ListMetadataRequest
    Command?: [{id: Scalars['ID']},CommandRequest]
    allCommands?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (CommandFilter | null)},CommandRequest] | CommandRequest
    _allCommandsMeta?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (CommandFilter | null)},ListMetadataRequest] | ListMetadataRequest
    Review?: [{id: Scalars['ID']},ReviewRequest]
    allReviews?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (ReviewFilter | null)},ReviewRequest] | ReviewRequest
    _allReviewsMeta?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (ReviewFilter | null)},ListMetadataRequest] | ListMetadataRequest
    Setting?: [{id: Scalars['ID']},SettingRequest]
    allSettings?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (SettingFilter | null)},SettingRequest] | SettingRequest
    _allSettingsMeta?: [{page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (SettingFilter | null)},ListMetadataRequest] | ListMetadataRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CustomerRequest{
    id?: boolean | number
    first_name?: boolean | number
    last_name?: boolean | number
    email?: boolean | number
    address?: boolean | number
    zipcode?: boolean | number
    city?: boolean | number
    avatar?: boolean | number
    birthday?: boolean | number
    first_seen?: boolean | number
    last_seen?: boolean | number
    has_ordered?: boolean | number
    latest_purchase?: boolean | number
    has_newsletter?: boolean | number
    groups?: boolean | number
    nb_commands?: boolean | number
    total_spent?: boolean | number
    Commands?: CommandRequest
    Reviews?: ReviewRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommandRequest{
    id?: boolean | number
    reference?: boolean | number
    date?: boolean | number
    customer_id?: boolean | number
    basket?: boolean | number
    total_ex_taxes?: boolean | number
    delivery_fees?: boolean | number
    tax_rate?: boolean | number
    taxes?: boolean | number
    total?: boolean | number
    status?: boolean | number
    returned?: boolean | number
    Customer?: CustomerRequest
    Reviews?: ReviewRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ReviewRequest{
    id?: boolean | number
    date?: boolean | number
    status?: boolean | number
    command_id?: boolean | number
    product_id?: boolean | number
    customer_id?: boolean | number
    rating?: boolean | number
    comment?: boolean | number
    Command?: CommandRequest
    Product?: ProductRequest
    Customer?: CustomerRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductRequest{
    id?: boolean | number
    category_id?: boolean | number
    reference?: boolean | number
    width?: boolean | number
    height?: boolean | number
    price?: boolean | number
    thumbnail?: boolean | number
    image?: boolean | number
    description?: boolean | number
    stock?: boolean | number
    Category?: CategoryRequest
    Reviews?: ReviewRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CategoryRequest{
    id?: boolean | number
    name?: boolean | number
    Products?: ProductRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CustomerFilter {q?: (Scalars['String'] | null),ids?: ((Scalars['ID'] | null)[] | null),id?: (Scalars['ID'] | null),first_name?: (Scalars['String'] | null),last_name?: (Scalars['String'] | null),email?: (Scalars['String'] | null),address?: (Scalars['String'] | null),zipcode?: (Scalars['String'] | null),city?: (Scalars['String'] | null),avatar?: (Scalars['String'] | null),birthday?: (Scalars['String'] | null),first_seen?: (Scalars['Date'] | null),last_seen?: (Scalars['Date'] | null),has_ordered?: (Scalars['Boolean'] | null),latest_purchase?: (Scalars['String'] | null),has_newsletter?: (Scalars['Boolean'] | null),groups?: ((Scalars['String'] | null)[] | null),nb_commands?: (Scalars['Int'] | null),total_spent?: (Scalars['Float'] | null),id_neq?: (Scalars['ID'] | null),first_name_neq?: (Scalars['String'] | null),last_name_neq?: (Scalars['String'] | null),email_neq?: (Scalars['String'] | null),address_neq?: (Scalars['String'] | null),zipcode_neq?: (Scalars['String'] | null),city_neq?: (Scalars['String'] | null),avatar_neq?: (Scalars['String'] | null),birthday_neq?: (Scalars['String'] | null),first_seen_lt?: (Scalars['Date'] | null),first_seen_lte?: (Scalars['Date'] | null),first_seen_gt?: (Scalars['Date'] | null),first_seen_gte?: (Scalars['Date'] | null),first_seen_neq?: (Scalars['Date'] | null),last_seen_lt?: (Scalars['Date'] | null),last_seen_lte?: (Scalars['Date'] | null),last_seen_gt?: (Scalars['Date'] | null),last_seen_gte?: (Scalars['Date'] | null),last_seen_neq?: (Scalars['Date'] | null),latest_purchase_neq?: (Scalars['String'] | null),groups_neq?: ((Scalars['String'] | null)[] | null),nb_commands_lt?: (Scalars['Int'] | null),nb_commands_lte?: (Scalars['Int'] | null),nb_commands_gt?: (Scalars['Int'] | null),nb_commands_gte?: (Scalars['Int'] | null),nb_commands_neq?: (Scalars['Int'] | null),total_spent_lt?: (Scalars['Float'] | null),total_spent_lte?: (Scalars['Float'] | null),total_spent_gt?: (Scalars['Float'] | null),total_spent_gte?: (Scalars['Float'] | null),total_spent_neq?: (Scalars['Float'] | null)}

export interface ListMetadataRequest{
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CategoryFilter {q?: (Scalars['String'] | null),ids?: ((Scalars['ID'] | null)[] | null),id?: (Scalars['ID'] | null),name?: (Scalars['String'] | null),id_neq?: (Scalars['ID'] | null),name_neq?: (Scalars['String'] | null)}

export interface ProductFilter {q?: (Scalars['String'] | null),ids?: ((Scalars['ID'] | null)[] | null),id?: (Scalars['ID'] | null),category_id?: (Scalars['ID'] | null),reference?: (Scalars['String'] | null),width?: (Scalars['Float'] | null),height?: (Scalars['Float'] | null),price?: (Scalars['Float'] | null),thumbnail?: (Scalars['String'] | null),image?: (Scalars['String'] | null),description?: (Scalars['String'] | null),stock?: (Scalars['Int'] | null),id_neq?: (Scalars['ID'] | null),category_id_neq?: (Scalars['ID'] | null),reference_neq?: (Scalars['String'] | null),width_lt?: (Scalars['Float'] | null),width_lte?: (Scalars['Float'] | null),width_gt?: (Scalars['Float'] | null),width_gte?: (Scalars['Float'] | null),width_neq?: (Scalars['Float'] | null),height_lt?: (Scalars['Float'] | null),height_lte?: (Scalars['Float'] | null),height_gt?: (Scalars['Float'] | null),height_gte?: (Scalars['Float'] | null),height_neq?: (Scalars['Float'] | null),price_lt?: (Scalars['Float'] | null),price_lte?: (Scalars['Float'] | null),price_gt?: (Scalars['Float'] | null),price_gte?: (Scalars['Float'] | null),price_neq?: (Scalars['Float'] | null),thumbnail_neq?: (Scalars['String'] | null),image_neq?: (Scalars['String'] | null),description_neq?: (Scalars['String'] | null),stock_lt?: (Scalars['Int'] | null),stock_lte?: (Scalars['Int'] | null),stock_gt?: (Scalars['Int'] | null),stock_gte?: (Scalars['Int'] | null),stock_neq?: (Scalars['Int'] | null)}

export interface CommandFilter {q?: (Scalars['String'] | null),ids?: ((Scalars['ID'] | null)[] | null),id?: (Scalars['ID'] | null),reference?: (Scalars['String'] | null),date?: (Scalars['Date'] | null),customer_id?: (Scalars['ID'] | null),basket?: (Scalars['JSON'] | null),total_ex_taxes?: (Scalars['Float'] | null),delivery_fees?: (Scalars['Float'] | null),tax_rate?: (Scalars['Float'] | null),taxes?: (Scalars['Float'] | null),total?: (Scalars['Float'] | null),status?: (Scalars['String'] | null),returned?: (Scalars['Boolean'] | null),id_neq?: (Scalars['ID'] | null),reference_neq?: (Scalars['String'] | null),date_lt?: (Scalars['Date'] | null),date_lte?: (Scalars['Date'] | null),date_gt?: (Scalars['Date'] | null),date_gte?: (Scalars['Date'] | null),date_neq?: (Scalars['Date'] | null),customer_id_neq?: (Scalars['ID'] | null),basket_neq?: (Scalars['JSON'] | null),total_ex_taxes_lt?: (Scalars['Float'] | null),total_ex_taxes_lte?: (Scalars['Float'] | null),total_ex_taxes_gt?: (Scalars['Float'] | null),total_ex_taxes_gte?: (Scalars['Float'] | null),total_ex_taxes_neq?: (Scalars['Float'] | null),delivery_fees_lt?: (Scalars['Float'] | null),delivery_fees_lte?: (Scalars['Float'] | null),delivery_fees_gt?: (Scalars['Float'] | null),delivery_fees_gte?: (Scalars['Float'] | null),delivery_fees_neq?: (Scalars['Float'] | null),tax_rate_lt?: (Scalars['Float'] | null),tax_rate_lte?: (Scalars['Float'] | null),tax_rate_gt?: (Scalars['Float'] | null),tax_rate_gte?: (Scalars['Float'] | null),tax_rate_neq?: (Scalars['Float'] | null),taxes_lt?: (Scalars['Float'] | null),taxes_lte?: (Scalars['Float'] | null),taxes_gt?: (Scalars['Float'] | null),taxes_gte?: (Scalars['Float'] | null),taxes_neq?: (Scalars['Float'] | null),total_lt?: (Scalars['Float'] | null),total_lte?: (Scalars['Float'] | null),total_gt?: (Scalars['Float'] | null),total_gte?: (Scalars['Float'] | null),total_neq?: (Scalars['Float'] | null),status_neq?: (Scalars['String'] | null)}

export interface ReviewFilter {q?: (Scalars['String'] | null),ids?: ((Scalars['ID'] | null)[] | null),id?: (Scalars['ID'] | null),date?: (Scalars['Date'] | null),status?: (Scalars['String'] | null),command_id?: (Scalars['ID'] | null),product_id?: (Scalars['ID'] | null),customer_id?: (Scalars['ID'] | null),rating?: (Scalars['Int'] | null),comment?: (Scalars['String'] | null),id_neq?: (Scalars['ID'] | null),date_lt?: (Scalars['Date'] | null),date_lte?: (Scalars['Date'] | null),date_gt?: (Scalars['Date'] | null),date_gte?: (Scalars['Date'] | null),date_neq?: (Scalars['Date'] | null),status_neq?: (Scalars['String'] | null),command_id_neq?: (Scalars['ID'] | null),product_id_neq?: (Scalars['ID'] | null),customer_id_neq?: (Scalars['ID'] | null),rating_lt?: (Scalars['Int'] | null),rating_lte?: (Scalars['Int'] | null),rating_gt?: (Scalars['Int'] | null),rating_gte?: (Scalars['Int'] | null),rating_neq?: (Scalars['Int'] | null),comment_neq?: (Scalars['String'] | null)}

export interface SettingRequest{
    id?: boolean | number
    configuration?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SettingFilter {q?: (Scalars['String'] | null),ids?: ((Scalars['ID'] | null)[] | null),id?: (Scalars['ID'] | null),configuration?: (Scalars['JSON'] | null),id_neq?: (Scalars['ID'] | null),configuration_neq?: (Scalars['JSON'] | null)}

export interface MutationRequest{
    createCustomer?: [{first_name: Scalars['String'],last_name: Scalars['String'],email: Scalars['String'],address?: (Scalars['String'] | null),zipcode?: (Scalars['String'] | null),city?: (Scalars['String'] | null),avatar: Scalars['String'],birthday?: (Scalars['String'] | null),first_seen: Scalars['Date'],last_seen: Scalars['Date'],has_ordered: Scalars['Boolean'],latest_purchase?: (Scalars['String'] | null),has_newsletter: Scalars['Boolean'],groups: (Scalars['String'] | null)[],nb_commands: Scalars['Int'],total_spent: Scalars['Float']},CustomerRequest]
    createManyCustomer?: [{data?: ((CustomerInput | null)[] | null)},CustomerRequest] | CustomerRequest
    updateCustomer?: [{id: Scalars['ID'],first_name?: (Scalars['String'] | null),last_name?: (Scalars['String'] | null),email?: (Scalars['String'] | null),address?: (Scalars['String'] | null),zipcode?: (Scalars['String'] | null),city?: (Scalars['String'] | null),avatar?: (Scalars['String'] | null),birthday?: (Scalars['String'] | null),first_seen?: (Scalars['Date'] | null),last_seen?: (Scalars['Date'] | null),has_ordered?: (Scalars['Boolean'] | null),latest_purchase?: (Scalars['String'] | null),has_newsletter?: (Scalars['Boolean'] | null),groups?: ((Scalars['String'] | null)[] | null),nb_commands?: (Scalars['Int'] | null),total_spent?: (Scalars['Float'] | null)},CustomerRequest]
    removeCustomer?: [{id: Scalars['ID']},CustomerRequest]
    createCategory?: [{name: Scalars['String']},CategoryRequest]
    createManyCategory?: [{data?: ((CategoryInput | null)[] | null)},CategoryRequest] | CategoryRequest
    updateCategory?: [{id: Scalars['ID'],name?: (Scalars['String'] | null)},CategoryRequest]
    removeCategory?: [{id: Scalars['ID']},CategoryRequest]
    createProduct?: [{category_id: Scalars['ID'],reference: Scalars['String'],width: Scalars['Float'],height: Scalars['Float'],price: Scalars['Float'],thumbnail: Scalars['String'],image: Scalars['String'],description: Scalars['String'],stock: Scalars['Int']},ProductRequest]
    createManyProduct?: [{data?: ((ProductInput | null)[] | null)},ProductRequest] | ProductRequest
    updateProduct?: [{id: Scalars['ID'],category_id?: (Scalars['ID'] | null),reference?: (Scalars['String'] | null),width?: (Scalars['Float'] | null),height?: (Scalars['Float'] | null),price?: (Scalars['Float'] | null),thumbnail?: (Scalars['String'] | null),image?: (Scalars['String'] | null),description?: (Scalars['String'] | null),stock?: (Scalars['Int'] | null)},ProductRequest]
    removeProduct?: [{id: Scalars['ID']},ProductRequest]
    createCommand?: [{reference: Scalars['String'],date: Scalars['Date'],customer_id: Scalars['ID'],basket: Scalars['JSON'],total_ex_taxes: Scalars['Float'],delivery_fees: Scalars['Float'],tax_rate: Scalars['Float'],taxes: Scalars['Float'],total: Scalars['Float'],status: Scalars['String'],returned: Scalars['Boolean']},CommandRequest]
    createManyCommand?: [{data?: ((CommandInput | null)[] | null)},CommandRequest] | CommandRequest
    updateCommand?: [{id: Scalars['ID'],reference?: (Scalars['String'] | null),date?: (Scalars['Date'] | null),customer_id?: (Scalars['ID'] | null),basket?: (Scalars['JSON'] | null),total_ex_taxes?: (Scalars['Float'] | null),delivery_fees?: (Scalars['Float'] | null),tax_rate?: (Scalars['Float'] | null),taxes?: (Scalars['Float'] | null),total?: (Scalars['Float'] | null),status?: (Scalars['String'] | null),returned?: (Scalars['Boolean'] | null)},CommandRequest]
    removeCommand?: [{id: Scalars['ID']},CommandRequest]
    createReview?: [{date: Scalars['Date'],status: Scalars['String'],command_id: Scalars['ID'],product_id: Scalars['ID'],customer_id: Scalars['ID'],rating: Scalars['Int'],comment: Scalars['String']},ReviewRequest]
    createManyReview?: [{data?: ((ReviewInput | null)[] | null)},ReviewRequest] | ReviewRequest
    updateReview?: [{id: Scalars['ID'],date?: (Scalars['Date'] | null),status?: (Scalars['String'] | null),command_id?: (Scalars['ID'] | null),product_id?: (Scalars['ID'] | null),customer_id?: (Scalars['ID'] | null),rating?: (Scalars['Int'] | null),comment?: (Scalars['String'] | null)},ReviewRequest]
    removeReview?: [{id: Scalars['ID']},ReviewRequest]
    createSetting?: [{configuration: Scalars['JSON']},SettingRequest]
    createManySetting?: [{data?: ((SettingInput | null)[] | null)},SettingRequest] | SettingRequest
    updateSetting?: [{id: Scalars['ID'],configuration?: (Scalars['JSON'] | null)},SettingRequest]
    removeSetting?: [{id: Scalars['ID']},SettingRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CustomerInput {id: Scalars['ID'],first_name: Scalars['String'],last_name: Scalars['String'],email: Scalars['String'],address?: (Scalars['String'] | null),zipcode?: (Scalars['String'] | null),city?: (Scalars['String'] | null),avatar: Scalars['String'],birthday?: (Scalars['String'] | null),first_seen: Scalars['Date'],last_seen: Scalars['Date'],has_ordered: Scalars['Boolean'],latest_purchase?: (Scalars['String'] | null),has_newsletter: Scalars['Boolean'],groups: (Scalars['String'] | null)[],nb_commands: Scalars['Int'],total_spent: Scalars['Float']}

export interface CategoryInput {id: Scalars['ID'],name: Scalars['String']}

export interface ProductInput {id: Scalars['ID'],category_id: Scalars['ID'],reference: Scalars['String'],width: Scalars['Float'],height: Scalars['Float'],price: Scalars['Float'],thumbnail: Scalars['String'],image: Scalars['String'],description: Scalars['String'],stock: Scalars['Int']}

export interface CommandInput {id: Scalars['ID'],reference: Scalars['String'],date: Scalars['Date'],customer_id: Scalars['ID'],basket: Scalars['JSON'],total_ex_taxes: Scalars['Float'],delivery_fees: Scalars['Float'],tax_rate: Scalars['Float'],taxes: Scalars['Float'],total: Scalars['Float'],status: Scalars['String'],returned: Scalars['Boolean']}

export interface ReviewInput {id: Scalars['ID'],date: Scalars['Date'],status: Scalars['String'],command_id: Scalars['ID'],product_id: Scalars['ID'],customer_id: Scalars['ID'],rating: Scalars['Int'],comment: Scalars['String']}

export interface SettingInput {id: Scalars['ID'],configuration: Scalars['JSON']}


const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Customer_possibleTypes = ['Customer']
export const isCustomer = (obj?: { __typename?: any } | null): obj is Customer => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCustomer"')
  return Customer_possibleTypes.includes(obj.__typename)
}



const Command_possibleTypes = ['Command']
export const isCommand = (obj?: { __typename?: any } | null): obj is Command => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCommand"')
  return Command_possibleTypes.includes(obj.__typename)
}



const Review_possibleTypes = ['Review']
export const isReview = (obj?: { __typename?: any } | null): obj is Review => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isReview"')
  return Review_possibleTypes.includes(obj.__typename)
}



const Product_possibleTypes = ['Product']
export const isProduct = (obj?: { __typename?: any } | null): obj is Product => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isProduct"')
  return Product_possibleTypes.includes(obj.__typename)
}



const Category_possibleTypes = ['Category']
export const isCategory = (obj?: { __typename?: any } | null): obj is Category => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCategory"')
  return Category_possibleTypes.includes(obj.__typename)
}



const ListMetadata_possibleTypes = ['ListMetadata']
export const isListMetadata = (obj?: { __typename?: any } | null): obj is ListMetadata => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isListMetadata"')
  return ListMetadata_possibleTypes.includes(obj.__typename)
}



const Setting_possibleTypes = ['Setting']
export const isSetting = (obj?: { __typename?: any } | null): obj is Setting => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSetting"')
  return Setting_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}


export interface QueryPromiseChain{
    Customer: ((args: {id: Scalars['ID']}) => CustomerPromiseChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Promise<(FieldsSelection<Customer, R> | undefined)>}),
    allCustomers: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (CustomerFilter | null)}) => {get: <R extends CustomerRequest>(request: R, defaultValue?: ((FieldsSelection<Customer, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Customer, R> | undefined)[] | undefined)>})&({get: <R extends CustomerRequest>(request: R, defaultValue?: ((FieldsSelection<Customer, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Customer, R> | undefined)[] | undefined)>}),
    _allCustomersMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (CustomerFilter | null)}) => ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>}),
    Category: ((args: {id: Scalars['ID']}) => CategoryPromiseChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: (FieldsSelection<Category, R> | undefined)) => Promise<(FieldsSelection<Category, R> | undefined)>}),
    allCategories: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (CategoryFilter | null)}) => {get: <R extends CategoryRequest>(request: R, defaultValue?: ((FieldsSelection<Category, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Category, R> | undefined)[] | undefined)>})&({get: <R extends CategoryRequest>(request: R, defaultValue?: ((FieldsSelection<Category, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Category, R> | undefined)[] | undefined)>}),
    _allCategoriesMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (CategoryFilter | null)}) => ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>}),
    Product: ((args: {id: Scalars['ID']}) => ProductPromiseChain & {get: <R extends ProductRequest>(request: R, defaultValue?: (FieldsSelection<Product, R> | undefined)) => Promise<(FieldsSelection<Product, R> | undefined)>}),
    allProducts: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (ProductFilter | null)}) => {get: <R extends ProductRequest>(request: R, defaultValue?: ((FieldsSelection<Product, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Product, R> | undefined)[] | undefined)>})&({get: <R extends ProductRequest>(request: R, defaultValue?: ((FieldsSelection<Product, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Product, R> | undefined)[] | undefined)>}),
    _allProductsMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (ProductFilter | null)}) => ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>}),
    Command: ((args: {id: Scalars['ID']}) => CommandPromiseChain & {get: <R extends CommandRequest>(request: R, defaultValue?: (FieldsSelection<Command, R> | undefined)) => Promise<(FieldsSelection<Command, R> | undefined)>}),
    allCommands: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (CommandFilter | null)}) => {get: <R extends CommandRequest>(request: R, defaultValue?: ((FieldsSelection<Command, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Command, R> | undefined)[] | undefined)>})&({get: <R extends CommandRequest>(request: R, defaultValue?: ((FieldsSelection<Command, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Command, R> | undefined)[] | undefined)>}),
    _allCommandsMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (CommandFilter | null)}) => ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>}),
    Review: ((args: {id: Scalars['ID']}) => ReviewPromiseChain & {get: <R extends ReviewRequest>(request: R, defaultValue?: (FieldsSelection<Review, R> | undefined)) => Promise<(FieldsSelection<Review, R> | undefined)>}),
    allReviews: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (ReviewFilter | null)}) => {get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Review, R> | undefined)[] | undefined)>})&({get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Review, R> | undefined)[] | undefined)>}),
    _allReviewsMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (ReviewFilter | null)}) => ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>}),
    Setting: ((args: {id: Scalars['ID']}) => SettingPromiseChain & {get: <R extends SettingRequest>(request: R, defaultValue?: (FieldsSelection<Setting, R> | undefined)) => Promise<(FieldsSelection<Setting, R> | undefined)>}),
    allSettings: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (SettingFilter | null)}) => {get: <R extends SettingRequest>(request: R, defaultValue?: ((FieldsSelection<Setting, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Setting, R> | undefined)[] | undefined)>})&({get: <R extends SettingRequest>(request: R, defaultValue?: ((FieldsSelection<Setting, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Setting, R> | undefined)[] | undefined)>}),
    _allSettingsMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (SettingFilter | null)}) => ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataPromiseChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Promise<(FieldsSelection<ListMetadata, R> | undefined)>})
}

export interface QueryObservableChain{
    Customer: ((args: {id: Scalars['ID']}) => CustomerObservableChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Observable<(FieldsSelection<Customer, R> | undefined)>}),
    allCustomers: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (CustomerFilter | null)}) => {get: <R extends CustomerRequest>(request: R, defaultValue?: ((FieldsSelection<Customer, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Customer, R> | undefined)[] | undefined)>})&({get: <R extends CustomerRequest>(request: R, defaultValue?: ((FieldsSelection<Customer, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Customer, R> | undefined)[] | undefined)>}),
    _allCustomersMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (CustomerFilter | null)}) => ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>}),
    Category: ((args: {id: Scalars['ID']}) => CategoryObservableChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: (FieldsSelection<Category, R> | undefined)) => Observable<(FieldsSelection<Category, R> | undefined)>}),
    allCategories: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (CategoryFilter | null)}) => {get: <R extends CategoryRequest>(request: R, defaultValue?: ((FieldsSelection<Category, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Category, R> | undefined)[] | undefined)>})&({get: <R extends CategoryRequest>(request: R, defaultValue?: ((FieldsSelection<Category, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Category, R> | undefined)[] | undefined)>}),
    _allCategoriesMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (CategoryFilter | null)}) => ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>}),
    Product: ((args: {id: Scalars['ID']}) => ProductObservableChain & {get: <R extends ProductRequest>(request: R, defaultValue?: (FieldsSelection<Product, R> | undefined)) => Observable<(FieldsSelection<Product, R> | undefined)>}),
    allProducts: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (ProductFilter | null)}) => {get: <R extends ProductRequest>(request: R, defaultValue?: ((FieldsSelection<Product, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Product, R> | undefined)[] | undefined)>})&({get: <R extends ProductRequest>(request: R, defaultValue?: ((FieldsSelection<Product, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Product, R> | undefined)[] | undefined)>}),
    _allProductsMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (ProductFilter | null)}) => ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>}),
    Command: ((args: {id: Scalars['ID']}) => CommandObservableChain & {get: <R extends CommandRequest>(request: R, defaultValue?: (FieldsSelection<Command, R> | undefined)) => Observable<(FieldsSelection<Command, R> | undefined)>}),
    allCommands: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (CommandFilter | null)}) => {get: <R extends CommandRequest>(request: R, defaultValue?: ((FieldsSelection<Command, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Command, R> | undefined)[] | undefined)>})&({get: <R extends CommandRequest>(request: R, defaultValue?: ((FieldsSelection<Command, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Command, R> | undefined)[] | undefined)>}),
    _allCommandsMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (CommandFilter | null)}) => ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>}),
    Review: ((args: {id: Scalars['ID']}) => ReviewObservableChain & {get: <R extends ReviewRequest>(request: R, defaultValue?: (FieldsSelection<Review, R> | undefined)) => Observable<(FieldsSelection<Review, R> | undefined)>}),
    allReviews: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (ReviewFilter | null)}) => {get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Review, R> | undefined)[] | undefined)>})&({get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Review, R> | undefined)[] | undefined)>}),
    _allReviewsMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (ReviewFilter | null)}) => ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>}),
    Setting: ((args: {id: Scalars['ID']}) => SettingObservableChain & {get: <R extends SettingRequest>(request: R, defaultValue?: (FieldsSelection<Setting, R> | undefined)) => Observable<(FieldsSelection<Setting, R> | undefined)>}),
    allSettings: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),sortField?: (Scalars['String'] | null),sortOrder?: (Scalars['String'] | null),filter?: (SettingFilter | null)}) => {get: <R extends SettingRequest>(request: R, defaultValue?: ((FieldsSelection<Setting, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Setting, R> | undefined)[] | undefined)>})&({get: <R extends SettingRequest>(request: R, defaultValue?: ((FieldsSelection<Setting, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Setting, R> | undefined)[] | undefined)>}),
    _allSettingsMeta: ((args?: {page?: (Scalars['Int'] | null),perPage?: (Scalars['Int'] | null),filter?: (SettingFilter | null)}) => ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>})&(ListMetadataObservableChain & {get: <R extends ListMetadataRequest>(request: R, defaultValue?: (FieldsSelection<ListMetadata, R> | undefined)) => Observable<(FieldsSelection<ListMetadata, R> | undefined)>})
}

export interface CustomerPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    first_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    last_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    email: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    address: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    zipcode: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    city: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    birthday: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    first_seen: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    last_seen: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    has_ordered: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    latest_purchase: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    has_newsletter: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    groups: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)[]) => Promise<(Scalars['String'] | undefined)[]>}),
    nb_commands: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    total_spent: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    Commands: ({get: <R extends CommandRequest>(request: R, defaultValue?: ((FieldsSelection<Command, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Command, R> | undefined)[] | undefined)>}),
    Reviews: ({get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Review, R> | undefined)[] | undefined)>})
}

export interface CustomerObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    first_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    last_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    email: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    address: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    zipcode: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    city: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    birthday: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    first_seen: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    last_seen: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    has_ordered: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    latest_purchase: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    has_newsletter: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    groups: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)[]) => Observable<(Scalars['String'] | undefined)[]>}),
    nb_commands: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    total_spent: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    Commands: ({get: <R extends CommandRequest>(request: R, defaultValue?: ((FieldsSelection<Command, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Command, R> | undefined)[] | undefined)>}),
    Reviews: ({get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Review, R> | undefined)[] | undefined)>})
}

export interface CommandPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    reference: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    date: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customer_id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    basket: ({get: (request?: boolean|number, defaultValue?: Scalars['JSON']) => Promise<Scalars['JSON']>}),
    total_ex_taxes: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    delivery_fees: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    tax_rate: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    taxes: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    total: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    status: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    returned: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    Customer: (CustomerPromiseChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Promise<(FieldsSelection<Customer, R> | undefined)>}),
    Reviews: ({get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Review, R> | undefined)[] | undefined)>})
}

export interface CommandObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    reference: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    date: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customer_id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    basket: ({get: (request?: boolean|number, defaultValue?: Scalars['JSON']) => Observable<Scalars['JSON']>}),
    total_ex_taxes: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    delivery_fees: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    tax_rate: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    taxes: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    total: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    status: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    returned: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    Customer: (CustomerObservableChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Observable<(FieldsSelection<Customer, R> | undefined)>}),
    Reviews: ({get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Review, R> | undefined)[] | undefined)>})
}

export interface ReviewPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    date: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    status: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    command_id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    product_id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    customer_id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    rating: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    Command: (CommandPromiseChain & {get: <R extends CommandRequest>(request: R, defaultValue?: (FieldsSelection<Command, R> | undefined)) => Promise<(FieldsSelection<Command, R> | undefined)>}),
    Product: (ProductPromiseChain & {get: <R extends ProductRequest>(request: R, defaultValue?: (FieldsSelection<Product, R> | undefined)) => Promise<(FieldsSelection<Product, R> | undefined)>}),
    Customer: (CustomerPromiseChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Promise<(FieldsSelection<Customer, R> | undefined)>})
}

export interface ReviewObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    date: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    status: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    command_id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    product_id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    customer_id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    rating: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    Command: (CommandObservableChain & {get: <R extends CommandRequest>(request: R, defaultValue?: (FieldsSelection<Command, R> | undefined)) => Observable<(FieldsSelection<Command, R> | undefined)>}),
    Product: (ProductObservableChain & {get: <R extends ProductRequest>(request: R, defaultValue?: (FieldsSelection<Product, R> | undefined)) => Observable<(FieldsSelection<Product, R> | undefined)>}),
    Customer: (CustomerObservableChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Observable<(FieldsSelection<Customer, R> | undefined)>})
}

export interface ProductPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    category_id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    reference: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    width: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    height: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    price: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    thumbnail: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    image: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    description: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    stock: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    Category: (CategoryPromiseChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: (FieldsSelection<Category, R> | undefined)) => Promise<(FieldsSelection<Category, R> | undefined)>}),
    Reviews: ({get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Review, R> | undefined)[] | undefined)>})
}

export interface ProductObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    category_id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    reference: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    width: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    height: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    price: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    thumbnail: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    image: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    description: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    stock: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    Category: (CategoryObservableChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: (FieldsSelection<Category, R> | undefined)) => Observable<(FieldsSelection<Category, R> | undefined)>}),
    Reviews: ({get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Review, R> | undefined)[] | undefined)>})
}

export interface CategoryPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    Products: ({get: <R extends ProductRequest>(request: R, defaultValue?: ((FieldsSelection<Product, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Product, R> | undefined)[] | undefined)>})
}

export interface CategoryObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    Products: ({get: <R extends ProductRequest>(request: R, defaultValue?: ((FieldsSelection<Product, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Product, R> | undefined)[] | undefined)>})
}

export interface ListMetadataPromiseChain{
    count: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface ListMetadataObservableChain{
    count: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface SettingPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    configuration: ({get: (request?: boolean|number, defaultValue?: Scalars['JSON']) => Promise<Scalars['JSON']>})
}

export interface SettingObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    configuration: ({get: (request?: boolean|number, defaultValue?: Scalars['JSON']) => Observable<Scalars['JSON']>})
}

export interface MutationPromiseChain{
    createCustomer: ((args: {first_name: Scalars['String'],last_name: Scalars['String'],email: Scalars['String'],address?: (Scalars['String'] | null),zipcode?: (Scalars['String'] | null),city?: (Scalars['String'] | null),avatar: Scalars['String'],birthday?: (Scalars['String'] | null),first_seen: Scalars['Date'],last_seen: Scalars['Date'],has_ordered: Scalars['Boolean'],latest_purchase?: (Scalars['String'] | null),has_newsletter: Scalars['Boolean'],groups: (Scalars['String'] | null)[],nb_commands: Scalars['Int'],total_spent: Scalars['Float']}) => CustomerPromiseChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Promise<(FieldsSelection<Customer, R> | undefined)>}),
    createManyCustomer: ((args?: {data?: ((CustomerInput | null)[] | null)}) => {get: <R extends CustomerRequest>(request: R, defaultValue?: ((FieldsSelection<Customer, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Customer, R> | undefined)[] | undefined)>})&({get: <R extends CustomerRequest>(request: R, defaultValue?: ((FieldsSelection<Customer, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Customer, R> | undefined)[] | undefined)>}),
    updateCustomer: ((args: {id: Scalars['ID'],first_name?: (Scalars['String'] | null),last_name?: (Scalars['String'] | null),email?: (Scalars['String'] | null),address?: (Scalars['String'] | null),zipcode?: (Scalars['String'] | null),city?: (Scalars['String'] | null),avatar?: (Scalars['String'] | null),birthday?: (Scalars['String'] | null),first_seen?: (Scalars['Date'] | null),last_seen?: (Scalars['Date'] | null),has_ordered?: (Scalars['Boolean'] | null),latest_purchase?: (Scalars['String'] | null),has_newsletter?: (Scalars['Boolean'] | null),groups?: ((Scalars['String'] | null)[] | null),nb_commands?: (Scalars['Int'] | null),total_spent?: (Scalars['Float'] | null)}) => CustomerPromiseChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Promise<(FieldsSelection<Customer, R> | undefined)>}),
    removeCustomer: ((args: {id: Scalars['ID']}) => CustomerPromiseChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Promise<(FieldsSelection<Customer, R> | undefined)>}),
    createCategory: ((args: {name: Scalars['String']}) => CategoryPromiseChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: (FieldsSelection<Category, R> | undefined)) => Promise<(FieldsSelection<Category, R> | undefined)>}),
    createManyCategory: ((args?: {data?: ((CategoryInput | null)[] | null)}) => {get: <R extends CategoryRequest>(request: R, defaultValue?: ((FieldsSelection<Category, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Category, R> | undefined)[] | undefined)>})&({get: <R extends CategoryRequest>(request: R, defaultValue?: ((FieldsSelection<Category, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Category, R> | undefined)[] | undefined)>}),
    updateCategory: ((args: {id: Scalars['ID'],name?: (Scalars['String'] | null)}) => CategoryPromiseChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: (FieldsSelection<Category, R> | undefined)) => Promise<(FieldsSelection<Category, R> | undefined)>}),
    removeCategory: ((args: {id: Scalars['ID']}) => CategoryPromiseChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: (FieldsSelection<Category, R> | undefined)) => Promise<(FieldsSelection<Category, R> | undefined)>}),
    createProduct: ((args: {category_id: Scalars['ID'],reference: Scalars['String'],width: Scalars['Float'],height: Scalars['Float'],price: Scalars['Float'],thumbnail: Scalars['String'],image: Scalars['String'],description: Scalars['String'],stock: Scalars['Int']}) => ProductPromiseChain & {get: <R extends ProductRequest>(request: R, defaultValue?: (FieldsSelection<Product, R> | undefined)) => Promise<(FieldsSelection<Product, R> | undefined)>}),
    createManyProduct: ((args?: {data?: ((ProductInput | null)[] | null)}) => {get: <R extends ProductRequest>(request: R, defaultValue?: ((FieldsSelection<Product, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Product, R> | undefined)[] | undefined)>})&({get: <R extends ProductRequest>(request: R, defaultValue?: ((FieldsSelection<Product, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Product, R> | undefined)[] | undefined)>}),
    updateProduct: ((args: {id: Scalars['ID'],category_id?: (Scalars['ID'] | null),reference?: (Scalars['String'] | null),width?: (Scalars['Float'] | null),height?: (Scalars['Float'] | null),price?: (Scalars['Float'] | null),thumbnail?: (Scalars['String'] | null),image?: (Scalars['String'] | null),description?: (Scalars['String'] | null),stock?: (Scalars['Int'] | null)}) => ProductPromiseChain & {get: <R extends ProductRequest>(request: R, defaultValue?: (FieldsSelection<Product, R> | undefined)) => Promise<(FieldsSelection<Product, R> | undefined)>}),
    removeProduct: ((args: {id: Scalars['ID']}) => ProductPromiseChain & {get: <R extends ProductRequest>(request: R, defaultValue?: (FieldsSelection<Product, R> | undefined)) => Promise<(FieldsSelection<Product, R> | undefined)>}),
    createCommand: ((args: {reference: Scalars['String'],date: Scalars['Date'],customer_id: Scalars['ID'],basket: Scalars['JSON'],total_ex_taxes: Scalars['Float'],delivery_fees: Scalars['Float'],tax_rate: Scalars['Float'],taxes: Scalars['Float'],total: Scalars['Float'],status: Scalars['String'],returned: Scalars['Boolean']}) => CommandPromiseChain & {get: <R extends CommandRequest>(request: R, defaultValue?: (FieldsSelection<Command, R> | undefined)) => Promise<(FieldsSelection<Command, R> | undefined)>}),
    createManyCommand: ((args?: {data?: ((CommandInput | null)[] | null)}) => {get: <R extends CommandRequest>(request: R, defaultValue?: ((FieldsSelection<Command, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Command, R> | undefined)[] | undefined)>})&({get: <R extends CommandRequest>(request: R, defaultValue?: ((FieldsSelection<Command, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Command, R> | undefined)[] | undefined)>}),
    updateCommand: ((args: {id: Scalars['ID'],reference?: (Scalars['String'] | null),date?: (Scalars['Date'] | null),customer_id?: (Scalars['ID'] | null),basket?: (Scalars['JSON'] | null),total_ex_taxes?: (Scalars['Float'] | null),delivery_fees?: (Scalars['Float'] | null),tax_rate?: (Scalars['Float'] | null),taxes?: (Scalars['Float'] | null),total?: (Scalars['Float'] | null),status?: (Scalars['String'] | null),returned?: (Scalars['Boolean'] | null)}) => CommandPromiseChain & {get: <R extends CommandRequest>(request: R, defaultValue?: (FieldsSelection<Command, R> | undefined)) => Promise<(FieldsSelection<Command, R> | undefined)>}),
    removeCommand: ((args: {id: Scalars['ID']}) => CommandPromiseChain & {get: <R extends CommandRequest>(request: R, defaultValue?: (FieldsSelection<Command, R> | undefined)) => Promise<(FieldsSelection<Command, R> | undefined)>}),
    createReview: ((args: {date: Scalars['Date'],status: Scalars['String'],command_id: Scalars['ID'],product_id: Scalars['ID'],customer_id: Scalars['ID'],rating: Scalars['Int'],comment: Scalars['String']}) => ReviewPromiseChain & {get: <R extends ReviewRequest>(request: R, defaultValue?: (FieldsSelection<Review, R> | undefined)) => Promise<(FieldsSelection<Review, R> | undefined)>}),
    createManyReview: ((args?: {data?: ((ReviewInput | null)[] | null)}) => {get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Review, R> | undefined)[] | undefined)>})&({get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Review, R> | undefined)[] | undefined)>}),
    updateReview: ((args: {id: Scalars['ID'],date?: (Scalars['Date'] | null),status?: (Scalars['String'] | null),command_id?: (Scalars['ID'] | null),product_id?: (Scalars['ID'] | null),customer_id?: (Scalars['ID'] | null),rating?: (Scalars['Int'] | null),comment?: (Scalars['String'] | null)}) => ReviewPromiseChain & {get: <R extends ReviewRequest>(request: R, defaultValue?: (FieldsSelection<Review, R> | undefined)) => Promise<(FieldsSelection<Review, R> | undefined)>}),
    removeReview: ((args: {id: Scalars['ID']}) => ReviewPromiseChain & {get: <R extends ReviewRequest>(request: R, defaultValue?: (FieldsSelection<Review, R> | undefined)) => Promise<(FieldsSelection<Review, R> | undefined)>}),
    createSetting: ((args: {configuration: Scalars['JSON']}) => SettingPromiseChain & {get: <R extends SettingRequest>(request: R, defaultValue?: (FieldsSelection<Setting, R> | undefined)) => Promise<(FieldsSelection<Setting, R> | undefined)>}),
    createManySetting: ((args?: {data?: ((SettingInput | null)[] | null)}) => {get: <R extends SettingRequest>(request: R, defaultValue?: ((FieldsSelection<Setting, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Setting, R> | undefined)[] | undefined)>})&({get: <R extends SettingRequest>(request: R, defaultValue?: ((FieldsSelection<Setting, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Setting, R> | undefined)[] | undefined)>}),
    updateSetting: ((args: {id: Scalars['ID'],configuration?: (Scalars['JSON'] | null)}) => SettingPromiseChain & {get: <R extends SettingRequest>(request: R, defaultValue?: (FieldsSelection<Setting, R> | undefined)) => Promise<(FieldsSelection<Setting, R> | undefined)>}),
    removeSetting: ((args: {id: Scalars['ID']}) => SettingPromiseChain & {get: <R extends SettingRequest>(request: R, defaultValue?: (FieldsSelection<Setting, R> | undefined)) => Promise<(FieldsSelection<Setting, R> | undefined)>})
}

export interface MutationObservableChain{
    createCustomer: ((args: {first_name: Scalars['String'],last_name: Scalars['String'],email: Scalars['String'],address?: (Scalars['String'] | null),zipcode?: (Scalars['String'] | null),city?: (Scalars['String'] | null),avatar: Scalars['String'],birthday?: (Scalars['String'] | null),first_seen: Scalars['Date'],last_seen: Scalars['Date'],has_ordered: Scalars['Boolean'],latest_purchase?: (Scalars['String'] | null),has_newsletter: Scalars['Boolean'],groups: (Scalars['String'] | null)[],nb_commands: Scalars['Int'],total_spent: Scalars['Float']}) => CustomerObservableChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Observable<(FieldsSelection<Customer, R> | undefined)>}),
    createManyCustomer: ((args?: {data?: ((CustomerInput | null)[] | null)}) => {get: <R extends CustomerRequest>(request: R, defaultValue?: ((FieldsSelection<Customer, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Customer, R> | undefined)[] | undefined)>})&({get: <R extends CustomerRequest>(request: R, defaultValue?: ((FieldsSelection<Customer, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Customer, R> | undefined)[] | undefined)>}),
    updateCustomer: ((args: {id: Scalars['ID'],first_name?: (Scalars['String'] | null),last_name?: (Scalars['String'] | null),email?: (Scalars['String'] | null),address?: (Scalars['String'] | null),zipcode?: (Scalars['String'] | null),city?: (Scalars['String'] | null),avatar?: (Scalars['String'] | null),birthday?: (Scalars['String'] | null),first_seen?: (Scalars['Date'] | null),last_seen?: (Scalars['Date'] | null),has_ordered?: (Scalars['Boolean'] | null),latest_purchase?: (Scalars['String'] | null),has_newsletter?: (Scalars['Boolean'] | null),groups?: ((Scalars['String'] | null)[] | null),nb_commands?: (Scalars['Int'] | null),total_spent?: (Scalars['Float'] | null)}) => CustomerObservableChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Observable<(FieldsSelection<Customer, R> | undefined)>}),
    removeCustomer: ((args: {id: Scalars['ID']}) => CustomerObservableChain & {get: <R extends CustomerRequest>(request: R, defaultValue?: (FieldsSelection<Customer, R> | undefined)) => Observable<(FieldsSelection<Customer, R> | undefined)>}),
    createCategory: ((args: {name: Scalars['String']}) => CategoryObservableChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: (FieldsSelection<Category, R> | undefined)) => Observable<(FieldsSelection<Category, R> | undefined)>}),
    createManyCategory: ((args?: {data?: ((CategoryInput | null)[] | null)}) => {get: <R extends CategoryRequest>(request: R, defaultValue?: ((FieldsSelection<Category, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Category, R> | undefined)[] | undefined)>})&({get: <R extends CategoryRequest>(request: R, defaultValue?: ((FieldsSelection<Category, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Category, R> | undefined)[] | undefined)>}),
    updateCategory: ((args: {id: Scalars['ID'],name?: (Scalars['String'] | null)}) => CategoryObservableChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: (FieldsSelection<Category, R> | undefined)) => Observable<(FieldsSelection<Category, R> | undefined)>}),
    removeCategory: ((args: {id: Scalars['ID']}) => CategoryObservableChain & {get: <R extends CategoryRequest>(request: R, defaultValue?: (FieldsSelection<Category, R> | undefined)) => Observable<(FieldsSelection<Category, R> | undefined)>}),
    createProduct: ((args: {category_id: Scalars['ID'],reference: Scalars['String'],width: Scalars['Float'],height: Scalars['Float'],price: Scalars['Float'],thumbnail: Scalars['String'],image: Scalars['String'],description: Scalars['String'],stock: Scalars['Int']}) => ProductObservableChain & {get: <R extends ProductRequest>(request: R, defaultValue?: (FieldsSelection<Product, R> | undefined)) => Observable<(FieldsSelection<Product, R> | undefined)>}),
    createManyProduct: ((args?: {data?: ((ProductInput | null)[] | null)}) => {get: <R extends ProductRequest>(request: R, defaultValue?: ((FieldsSelection<Product, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Product, R> | undefined)[] | undefined)>})&({get: <R extends ProductRequest>(request: R, defaultValue?: ((FieldsSelection<Product, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Product, R> | undefined)[] | undefined)>}),
    updateProduct: ((args: {id: Scalars['ID'],category_id?: (Scalars['ID'] | null),reference?: (Scalars['String'] | null),width?: (Scalars['Float'] | null),height?: (Scalars['Float'] | null),price?: (Scalars['Float'] | null),thumbnail?: (Scalars['String'] | null),image?: (Scalars['String'] | null),description?: (Scalars['String'] | null),stock?: (Scalars['Int'] | null)}) => ProductObservableChain & {get: <R extends ProductRequest>(request: R, defaultValue?: (FieldsSelection<Product, R> | undefined)) => Observable<(FieldsSelection<Product, R> | undefined)>}),
    removeProduct: ((args: {id: Scalars['ID']}) => ProductObservableChain & {get: <R extends ProductRequest>(request: R, defaultValue?: (FieldsSelection<Product, R> | undefined)) => Observable<(FieldsSelection<Product, R> | undefined)>}),
    createCommand: ((args: {reference: Scalars['String'],date: Scalars['Date'],customer_id: Scalars['ID'],basket: Scalars['JSON'],total_ex_taxes: Scalars['Float'],delivery_fees: Scalars['Float'],tax_rate: Scalars['Float'],taxes: Scalars['Float'],total: Scalars['Float'],status: Scalars['String'],returned: Scalars['Boolean']}) => CommandObservableChain & {get: <R extends CommandRequest>(request: R, defaultValue?: (FieldsSelection<Command, R> | undefined)) => Observable<(FieldsSelection<Command, R> | undefined)>}),
    createManyCommand: ((args?: {data?: ((CommandInput | null)[] | null)}) => {get: <R extends CommandRequest>(request: R, defaultValue?: ((FieldsSelection<Command, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Command, R> | undefined)[] | undefined)>})&({get: <R extends CommandRequest>(request: R, defaultValue?: ((FieldsSelection<Command, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Command, R> | undefined)[] | undefined)>}),
    updateCommand: ((args: {id: Scalars['ID'],reference?: (Scalars['String'] | null),date?: (Scalars['Date'] | null),customer_id?: (Scalars['ID'] | null),basket?: (Scalars['JSON'] | null),total_ex_taxes?: (Scalars['Float'] | null),delivery_fees?: (Scalars['Float'] | null),tax_rate?: (Scalars['Float'] | null),taxes?: (Scalars['Float'] | null),total?: (Scalars['Float'] | null),status?: (Scalars['String'] | null),returned?: (Scalars['Boolean'] | null)}) => CommandObservableChain & {get: <R extends CommandRequest>(request: R, defaultValue?: (FieldsSelection<Command, R> | undefined)) => Observable<(FieldsSelection<Command, R> | undefined)>}),
    removeCommand: ((args: {id: Scalars['ID']}) => CommandObservableChain & {get: <R extends CommandRequest>(request: R, defaultValue?: (FieldsSelection<Command, R> | undefined)) => Observable<(FieldsSelection<Command, R> | undefined)>}),
    createReview: ((args: {date: Scalars['Date'],status: Scalars['String'],command_id: Scalars['ID'],product_id: Scalars['ID'],customer_id: Scalars['ID'],rating: Scalars['Int'],comment: Scalars['String']}) => ReviewObservableChain & {get: <R extends ReviewRequest>(request: R, defaultValue?: (FieldsSelection<Review, R> | undefined)) => Observable<(FieldsSelection<Review, R> | undefined)>}),
    createManyReview: ((args?: {data?: ((ReviewInput | null)[] | null)}) => {get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Review, R> | undefined)[] | undefined)>})&({get: <R extends ReviewRequest>(request: R, defaultValue?: ((FieldsSelection<Review, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Review, R> | undefined)[] | undefined)>}),
    updateReview: ((args: {id: Scalars['ID'],date?: (Scalars['Date'] | null),status?: (Scalars['String'] | null),command_id?: (Scalars['ID'] | null),product_id?: (Scalars['ID'] | null),customer_id?: (Scalars['ID'] | null),rating?: (Scalars['Int'] | null),comment?: (Scalars['String'] | null)}) => ReviewObservableChain & {get: <R extends ReviewRequest>(request: R, defaultValue?: (FieldsSelection<Review, R> | undefined)) => Observable<(FieldsSelection<Review, R> | undefined)>}),
    removeReview: ((args: {id: Scalars['ID']}) => ReviewObservableChain & {get: <R extends ReviewRequest>(request: R, defaultValue?: (FieldsSelection<Review, R> | undefined)) => Observable<(FieldsSelection<Review, R> | undefined)>}),
    createSetting: ((args: {configuration: Scalars['JSON']}) => SettingObservableChain & {get: <R extends SettingRequest>(request: R, defaultValue?: (FieldsSelection<Setting, R> | undefined)) => Observable<(FieldsSelection<Setting, R> | undefined)>}),
    createManySetting: ((args?: {data?: ((SettingInput | null)[] | null)}) => {get: <R extends SettingRequest>(request: R, defaultValue?: ((FieldsSelection<Setting, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Setting, R> | undefined)[] | undefined)>})&({get: <R extends SettingRequest>(request: R, defaultValue?: ((FieldsSelection<Setting, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Setting, R> | undefined)[] | undefined)>}),
    updateSetting: ((args: {id: Scalars['ID'],configuration?: (Scalars['JSON'] | null)}) => SettingObservableChain & {get: <R extends SettingRequest>(request: R, defaultValue?: (FieldsSelection<Setting, R> | undefined)) => Observable<(FieldsSelection<Setting, R> | undefined)>}),
    removeSetting: ((args: {id: Scalars['ID']}) => SettingObservableChain & {get: <R extends SettingRequest>(request: R, defaultValue?: (FieldsSelection<Setting, R> | undefined)) => Observable<(FieldsSelection<Setting, R> | undefined)>})
}