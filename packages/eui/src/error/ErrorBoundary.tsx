import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary"
import { ErrorBoundaryFallback } from "./ErrorBoundaryFallback"

export const ErrorBoundary: React.FC = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      {children}
    </ReactErrorBoundary>
  )
}
