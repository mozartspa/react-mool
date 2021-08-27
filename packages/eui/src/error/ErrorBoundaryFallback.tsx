import { EuiButton, EuiEmptyPrompt, EuiPageTemplate, EuiSpacer } from "@elastic/eui"
import { defaultI18nProvider, I18nProvider } from "@react-mool/core"
import { useEffect } from "react"
import { FallbackProps } from "react-error-boundary"
import { t } from "../i18n"

function safeTranslate(i18nProvider: I18nProvider, key: string, defaultValue: string) {
  try {
    return i18nProvider.translate(key)
  } catch {
    return defaultValue
  }
}

export type ErrorBoundaryFallbackProps = FallbackProps & {
  i18nProvider?: I18nProvider
}

export const ErrorBoundaryFallback = (props: ErrorBoundaryFallbackProps) => {
  const { resetErrorBoundary, i18nProvider = defaultI18nProvider } = props

  const title = safeTranslate(i18nProvider, t.eui.error.general, "An error occurred")
  const retry = safeTranslate(i18nProvider, t.eui.action.retry, "Retry")

  // If URL changes, we reset the error
  useEffect(() => {
    window.addEventListener("popstate", resetErrorBoundary)
    return () => window.removeEventListener("popstate", resetErrorBoundary)
  }, [resetErrorBoundary])

  return (
    <EuiPageTemplate template="centeredContent" style={{ minHeight: "100vh" }}>
      <EuiEmptyPrompt
        iconType="alert"
        iconColor="danger"
        title={<h2>{title}</h2>}
        body={
          <>
            <EuiSpacer />
            <EuiButton onClick={resetErrorBoundary}>{retry}</EuiButton>
          </>
        }
      />
    </EuiPageTemplate>
  )
}
