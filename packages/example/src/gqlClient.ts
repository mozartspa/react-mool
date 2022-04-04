import { createClient } from "./generated"

export const gqlClient = createClient({
  url: "http://localhost:3999/graphql",
})
