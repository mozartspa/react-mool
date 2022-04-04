import {
  EuiButton,
  EuiLoadingContent,
  EuiPageHeader,
  EuiSpacer,
  EuiText,
} from "@elastic/eui"
import { Suspense, useState } from "react"
import { useQuery } from "react-query"
import { everything, QueryResult } from "../generated"
import { gqlClient } from "../gqlClient"

export const Dashboard = () => {
  return (
    <>
      <EuiPageHeader
        pageTitle="Dashboard"
        iconType="dashboardApp"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper lacinia elit sit amet vestibulum. Maecenas sed felis tortor. Aenean iaculis eu lectus sed commodo. Mauris dignissim libero quis mollis porta. Donec mauris mi, semper vitae ligula eu, interdum accumsan arcu. Integer laoreet tempus ultricies."
      />
      <Suspense fallback={<EuiLoadingContent />}>
        <Other />
      </Suspense>
    </>
  )
}

function tuple<T1, T2>(data: [T1, T2]): typeof data
function tuple(data: Array<any>) {
  return data
}

const fields = {
  allProducts: tuple([
    { page: 1, perPage: 3 },
    {
      ...everything,
      Category: { id: true, name: true },
    },
  ]),
}

type ReturnedType = QueryResult<typeof fields>

async function fetch() {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const result: ReturnedType = await gqlClient.query(fields)

  /*const result = await gqlClient.query({
    allProducts: [
      { page: 1, perPage: 3 },
      {
        ...everything,
        Category: { id: true, name: true },
      },
    ],
  })*/

  return result
}

const Other = () => {
  const { data, isLoading } = useQuery(["products-list"], fetch, { suspense: true })
  const [showOther2, setShowOther2] = useState(false)

  if (isLoading) {
    return <span>"UH-OH...WTF!"</span>
  }

  return (
    <>
      <Suspense fallback={<EuiLoadingContent />}>{showOther2 && <Other2 />}</Suspense>
      <EuiSpacer />
      <EuiButton onClick={() => setShowOther2((val) => !val)}>Mostra altro</EuiButton>
      <EuiSpacer />
      <EuiText>
        <ol>
          {data?.allProducts?.map((o) => (
            <li key={o.id}>{JSON.stringify(o, null, 2)}</li>
          ))}
        </ol>
      </EuiText>
    </>
  )
}

const Other2 = () => {
  const { data, isLoading } = useQuery(["products-list-2"], fetch, { suspense: true })

  if (isLoading) {
    return <span>"UH-OH...WTF2!"</span>
  }

  return (
    <EuiText>
      <ol>
        {data?.allProducts?.map((o) => (
          <li key={o.id}>{JSON.stringify(o, null, 2)}</li>
        ))}
      </ol>
    </EuiText>
  )
}
