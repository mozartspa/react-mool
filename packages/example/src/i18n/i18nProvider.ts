import {
  createPolyglotI18nProvider,
  createPolyglotI18nProviderAsync,
  I18nProvider,
} from "@react-mool/core"
import { EN } from "./en"
import { IT } from "./it"

const LS_LOCALE_KEY = "locale"

let locale = localStorage.getItem(LS_LOCALE_KEY) || "en"

export const i18nProvider: I18nProvider = {
  translate: (key) => `${key}_${locale}`,
  changeLocale: async (newLocale: string) => {
    locale = newLocale
    localStorage.setItem(LS_LOCALE_KEY, newLocale)
  },
  getInitialLocale: () => locale,
}

export const polyglotI18nProvider = createPolyglotI18nProvider({
  defaultLocale: "en",
  getMessages: (locale) => {
    if (locale === "it") {
      return IT
    } else {
      return EN
    }
  },
})

export const polyglotI18nProviderAsync = createPolyglotI18nProviderAsync({
  defaultLocale: "en",
  getMessages: async (locale) => {
    if (locale === "it") {
      return IT
    } else {
      return EN
    }
  },
})
