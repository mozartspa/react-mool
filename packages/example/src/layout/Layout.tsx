import { Layout as DefaultLayout, LayoutProps } from "@react-mool/eui"

export const Layout = (props: LayoutProps) => {
  return <DefaultLayout {...props}>{props.children}</DefaultLayout>
}
