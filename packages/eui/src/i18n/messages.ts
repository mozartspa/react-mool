import { buildTranslationKeys } from "@react-mool/core"
import { euiTokens } from "./euiTokens"

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
      dashboard: "Dashboard",
      main_navigation: "Main navigation",
      toggle_main_navigation: "Toggle main navigation",
    },
    action: {
      create: "Create",
      view: "View",
      edit: "Edit",
      save: "Save",
      delete: "Delete",
      retry: "Retry",
      goBack: "Go back",
      update: "Update",
      cancel: "Cancel",
    },
    bulk: {
      actions: "Bulk actions",
      delete_confirm: "Delete 1 element? |||| Delete %{smart_count} elements?",
      deleted_items: "Element deleted |||| %{smart_count} elements deleted",
    },
    grid: {
      showing: "Showing %{count} of %{total}",
      selected: "Selected",
      no_items: "No items found",
      sorted_by_asc: "Items sorted by %{field} in ascending order",
      sorted_by_desc: "Items sorted by %{field} in descending order",
    },
    columns: {
      manage: "Manage columns",
      reset: "Reset columns",
    },
    filter: {
      add_filter: "Add filter",
      remove_filter: "Remove filter",
      reset_filters: "Reset all filters",
      toggle_filter_menu: "Toggle filter menu",
    },
    confirm: {
      cancel: "Cancel",
      ok: "OK",
    },
    confirm_leave: {
      title: "Unsaved changes",
      message: "There are unsaved changes. Do you want to leave anyway?",
      leave: "Leave without saving",
      stay: "Stay",
    },
    error: {
      general: "Ooops, something went wrong",
      notfound_title: "Not found",
      notfound_message: "Either you typed a wrong URL, or you followed a bad link...",
    },
    validation: {
      required: "Field required",
    },
    refresh: {
      title: "Update the data?",
      content:
        "The item has been changed in the meantime. If you update, you will lose your unsaved changes.",
    },
    sort: {
      asc: "sorted ascending",
      desc: "sorted descending",
    },
  },
  euiTokens,
}

export const t = buildTranslationKeys(englishEuiMessages)

export type EuiMessages = typeof englishEuiMessages
