/**
 * GQLESS: You can safely modify this file and Query Fetcher based on your needs
 */

import { createClient, QueryFetcher } from "@mozartspa/gqless"
import { createReactClient } from "@mozartspa/gqless-react"
import {
  generatedSchema,
  GeneratedSchema,
  scalarsEnumsHash,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated"

const queryFetcher: QueryFetcher = async function (query, variables) {
  // Modify "http://localhost:3999/graphql" if needed
  const response = await fetch("http://localhost:3999/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: "cors",
  })

  const json = await response.json()

  return json
}

export const client = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
})

export const { query, mutation, mutate, subscription, resolved, refetch } = client

export const {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
} = createReactClient<GeneratedSchema>(client, {
  defaults: {
    // Set this flag as "true" if your usage involves React Suspense
    // Keep in mind that you can overwrite it in a per-hook basis
    suspense: false,

    // Set this flag based on your needs
    staleWhileRevalidate: false,
  },
})

// Enable gqless logger
if (process.env.NODE_ENV === "development") {
  import("@mozartspa/gqless-logger").then(({ createLogger }) => {
    const logger = createLogger(client, {
      // Custom options...
    })
    logger.start()
  })
}

export * from "./schema.generated"
