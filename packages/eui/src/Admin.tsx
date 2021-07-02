import "@elastic/eui/dist/eui_theme_amsterdam_light.css"
import { AdminCore, AdminCoreProps } from "@react-mool/core"
import { ComponentType, ReactNode } from "react"
import { Layout } from "./layout/Layout"

export type AdminProps = AdminCoreProps & {
  layout?: ComponentType
  children?: ReactNode
}

export const Admin = (props: AdminProps) => {
  const { layout, children, ...coreProps } = props

  const AppLayout = layout || Layout

  return (
    <AdminCore {...coreProps}>
      <AppLayout>{children}</AppLayout>
    </AdminCore>
  )
}
