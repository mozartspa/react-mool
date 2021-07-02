import "@elastic/eui/dist/eui_theme_amsterdam_light.css"
import React, { ReactNode } from "react"

export type AdminProps = {
  children?: ReactNode
}

export const Admin = (props: AdminProps) => {
  return <>{props.children}</>
}
