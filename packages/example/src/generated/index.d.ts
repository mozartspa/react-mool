import { ClientOptions, FieldsSelection, GraphqlOperation } from "@genql/runtime"
import { SubscriptionClient } from "subscriptions-transport-ws"
import {
  Mutation,
  MutationPromiseChain,
  MutationRequest,
  Query,
  QueryPromiseChain,
  QueryRequest,
} from "./schema"
export * from "./schema"
export declare const createClient: (options?: ClientOptions) => Client
export declare const everything: { __scalar: boolean }
export declare const version: string

export interface Client {
  wsClient?: SubscriptionClient

  query<R extends QueryRequest>(
    request: R & { __name?: string }
  ): Promise<FieldsSelection<Query, R>>

  mutation<R extends MutationRequest>(
    request: R & { __name?: string }
  ): Promise<FieldsSelection<Mutation, R>>

  chain: {
    query: QueryPromiseChain

    mutation: MutationPromiseChain
  }
}

export type QueryResult<fields extends QueryRequest> = FieldsSelection<Query, fields>

export declare const generateQueryOp: (
  fields: QueryRequest & { __name?: string }
) => GraphqlOperation
export type MutationResult<fields extends MutationRequest> = FieldsSelection<
  Mutation,
  fields
>

export declare const generateMutationOp: (
  fields: MutationRequest & { __name?: string }
) => GraphqlOperation
