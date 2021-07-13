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
  },
}

export const t = buildTranslationKeys(englishEuiMessages)

export type EuiMessages = typeof englishEuiMessages
