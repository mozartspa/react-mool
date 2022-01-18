import DATA from "./data"
import { dset } from "./dset"

export const Tokens = () => {
  const result = DATA.reduce((acc, item) => {
    dset(acc, item.token, item.defString)
    return acc
  }, {} as Record<string, string>)

  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
