import { Layout as DefaultLayout, LayoutProps } from "@react-mool/eui"
import { Menu } from "./Menu"

export const Layout = (props: LayoutProps) => {
  return (
    <DefaultLayout menu={Menu} {...props} appTitle="MyApp">
      {props.children}
    </DefaultLayout>
  )
}
