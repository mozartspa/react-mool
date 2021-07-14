import {
  createPolyglotI18nProvider,
  createPolyglotI18nProviderAsync,
} from "@react-mool/core"
import { englishMessages } from "./en"
import { italianMessages } from "./it"

export const polyglotI18nProvider = createPolyglotI18nProvider({
  defaultLocale: "en",
  getMessages: (locale) => {
    if (locale === "it") {
      return italianMessages
    } else {
      return englishMessages
    }
  },
})

export const polyglotI18nProviderAsync = createPolyglotI18nProviderAsync({
  defaultLocale: "en",
  getMessages: async (locale) => {
    if (locale === "it") {
      return italianMessages
    } else {
      return englishMessages
    }
  },
})
