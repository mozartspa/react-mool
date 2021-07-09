import {
  createPolyglotI18nProvider,
  createPolyglotI18nProviderAsync,
} from "@react-mool/core"
import { EN } from "./en"
import { IT } from "./it"

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
