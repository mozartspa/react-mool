import {
  createPolyglotI18nProvider,
  createPolyglotI18nProviderAsync,
  I18nProvider,
} from "@react-mool/core"

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

const translations = {
  en: {
    show: "Show",
    open: "Open",
    close: "Close",
  },
  it: {
    show: "Mostra",
    open: "Apri",
    close: "Chiudi",
  },
}

export const polyglotI18nProvider = createPolyglotI18nProvider({
  defaultLocale: "en",
  getMessages: (locale) => {
    if (locale === "it") {
      return translations.it
    } else {
      return translations.en
    }
  },
})

export const polyglotI18nProviderAsync = createPolyglotI18nProviderAsync({
  defaultLocale: "en",
  getMessages: async (locale) => {
    if (locale === "fr") {
      //throw new Error("limortacciloro")
    }
    if (locale === "it") {
      return translations.it
    } else {
      return translations.en
    }
  },
})
