import { I18nProvider } from "@react-mool/core"

const LS_LOCALE_KEY = "locale"

let locale = localStorage.getItem(LS_LOCALE_KEY) || "en"

export const i18nProvider: I18nProvider = {
  translate: (key) => `${key}_${locale}`,
  changeLocale: async (newLocale: string) => {
    locale = newLocale
    localStorage.setItem(LS_LOCALE_KEY, newLocale)
  },
  getLocale: () => locale,
}
