import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
} from "@elastic/eui"
import { Admin } from "@react-mool/eui"

function App() {
  return (
    <Admin>
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
            <EuiPageContentBody></EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </Admin>
  )
}

export default App
