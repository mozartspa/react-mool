import { I18nProvider } from "@react-mool/core"
import { ReactNode } from "react"
import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryPropsWithRender,
} from "react-error-boundary"
import { ErrorBoundaryFallback } from "./ErrorBoundaryFallback"

export type ErrorBoundaryProps = Partial<ErrorBoundaryPropsWithRender> & {
  i18nProvider?: I18nProvider
  children?: ReactNode
}

export const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const { i18nProvider, children, ...rest } = props

  return (
    <ReactErrorBoundary
      fallbackRender={(props) => (
        <ErrorBoundaryFallback {...props} i18nProvider={i18nProvider} />
      )}
      {...rest}
    >
      {children}
    </ReactErrorBoundary>
  )
}
