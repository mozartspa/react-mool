import { EuiErrorBoundary, EuiLoadingSpinner, EuiProvider } from "@elastic/eui"
import "@elastic/eui/dist/eui_theme_light.css"
import { CoreContext } from "@react-mool/core-v2"
import { Layout } from "@react-mool/eui-v2"
import { Suspense } from "react"
import { ProductList } from "./products"

function App() {
  return (
    <CoreContext>
      <EuiProvider colorMode="light">
        <EuiErrorBoundary>
          <Layout>
            <Suspense fallback={<EuiLoadingSpinner size="l" />}>
              <ProductList />
            </Suspense>
          </Layout>
        </EuiErrorBoundary>
      </EuiProvider>
    </CoreContext>
  )
}

export default App
