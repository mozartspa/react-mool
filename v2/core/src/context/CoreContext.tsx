import { DefaultOptions, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { NotificationContext, useNotification } from "../notify"

const queryClientDefaultOptions: DefaultOptions = {
  queries: {
    retry: 1,
  },
}

export type CoreContextProps = {
  queryClient?: QueryClient
  children?: ReactNode
}

export const CoreContext = (props: CoreContextProps) => {
  const { children } = props

  const [queryClient] = useState(
    () =>
      props.queryClient || new QueryClient({ defaultOptions: queryClientDefaultOptions })
  )
  const notifications = useNotification()

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContext.Provider value={notifications}>
        {children}
      </NotificationContext.Provider>
    </QueryClientProvider>
  )
}
