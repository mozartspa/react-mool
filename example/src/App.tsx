import { EuiButton, EuiProvider } from "@elastic/eui"
import "@elastic/eui/dist/eui_theme_light.css"
import { CoreContext } from "@react-mool/core-v2"
import { Layout } from "@react-mool/eui-v2"

function App() {
  return (
    <CoreContext>
      <EuiProvider colorMode="light">
        <Layout>
          <EuiButton color="danger">Ciao</EuiButton>
        </Layout>
      </EuiProvider>
    </CoreContext>
  )
}

export default App
