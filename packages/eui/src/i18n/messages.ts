import { buildTranslationKeys } from "@react-mool/core"

export const englishEuiMessages = {
  eui: {
    login: {
      title: "Log in",
      username_label: "Username",
      password_label: "Password",
      invalid_credentials: "Invalid credentials",
      login_btn: "Log in",
    },
    logout: {
      account_menu: "Account menu",
      logout_btn: "Log out",
    },
    layout: {
      dock_navigation: "Dock navigation",
      undock_navigation: "Undock navigation",
    },
    action: {
      create: "Create",
      view: "View",
      edit: "Edit",
      delete: "Delete",
    },
    bulk: {
      actions: "Bulk actions",
      deleted_items: "Element deleted |||| %{smart_count} elements deleted",
    },
    grid: {
      showing: "Showing %{count} of %{total}",
      selected: "Selected",
    },
    confirm: {
      cancel: "Cancel",
      ok: "OK",
    },
    error: {
      general: "Ooops, something went wrong",
    },
  },
}

export const t = buildTranslationKeys(englishEuiMessages)

export type EuiMessages = typeof englishEuiMessages
