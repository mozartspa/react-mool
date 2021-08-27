import { RouteProps } from "react-router-dom"

export type CustomRouteProps = RouteProps & {
  noLayout?: boolean
}

export const CustomRoute: React.FC<CustomRouteProps> = () => {
  throw new Error(
    "<CustomRoute/> can be used only in `customRoutes` prop of <AdminRouter/>"
  )
}
