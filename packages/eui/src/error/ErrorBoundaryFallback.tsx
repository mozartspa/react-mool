import { EuiButton, EuiEmptyPrompt, EuiPageTemplate, EuiSpacer } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { FallbackProps } from "react-error-boundary"
import { t } from "../i18n"

export const ErrorBoundaryFallback = (props: FallbackProps) => {
  const { resetErrorBoundary } = props

  const translate = useTranslate()

  return (
    <EuiPageTemplate template="centeredContent" style={{ minHeight: "100vh" }}>
      <EuiEmptyPrompt
        iconType="alert"
        iconColor="danger"
        title={<h2>{translate(t.eui.error.general)}</h2>}
        body={
          <>
            <EuiSpacer />
            <EuiButton onClick={resetErrorBoundary}>
              {translate(t.eui.action.retry)}
            </EuiButton>
          </>
        }
      />
    </EuiPageTemplate>
  )
}
