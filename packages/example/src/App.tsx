import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
} from "@elastic/eui"
import { Admin } from "@react-mool/eui"
import { QueryClient, QueryClientProvider } from "react-query"
import { DataProviderContext } from "../../core/dist"
import { dataProvider } from "./dataProvider"
import { ProductDetail } from "./products/ProductDetail"

const queryClient = new QueryClient()

function App() {
  return (
    <Admin>
      <QueryClientProvider client={queryClient}>
        <DataProviderContext.Provider value={dataProvider}>
          <EuiPage>
            <EuiPageBody panelled>
              <EuiPageHeader iconType="logoElastic" pageTitle="Example" />
              <EuiPageContent
                hasBorder={false}
                hasShadow={false}
                paddingSize="none"
                color="transparent"
                borderRadius="none"
              >
                <EuiPageContentBody>
                  <ProductDetail />
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </DataProviderContext.Provider>
      </QueryClientProvider>
    </Admin>
  )
}

export default App
