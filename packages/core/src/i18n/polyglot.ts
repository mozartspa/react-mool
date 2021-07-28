import Polyglot, { PolyglotOptions } from "node-polyglot"
import { I18nProvider } from "./translation"

export interface PolyglotMessages extends Record<string, string | PolyglotMessages> {}

export type PolyglotI18nProviderConfig = {
  defaultLocale: string
  getMessages: (locale: string) => PolyglotMessages
  persistLocale?: boolean
  persistLocaleKey?: string
  polyglotOptions?: PolyglotOptions
}

export type PolyglotI18nProviderConfigAsync = Omit<
  PolyglotI18nProviderConfig,
  "getMessages"
> & {
  getMessages: (locale: string) => Promise<PolyglotMessages>
}

const DEFAULT_PERSIST_LOCALE_KEY = "polyglotI18nProviderLocale"

function createPolyglotInstance(
  locale: string,
  phrases: PolyglotMessages,
  options?: PolyglotOptions
) {
  return new Polyglot({
    locale,
    phrases,
    allowMissing: true,
    ...options,
  })
}

export function createPolyglotI18nProvider(config: PolyglotI18nProviderConfig) {
  const {
    defaultLocale,
    getMessages,
    persistLocale = true,
    persistLocaleKey = DEFAULT_PERSIST_LOCALE_KEY,
    polyglotOptions,
  } = config

  const canPersist = persistLocale && typeof localStorage !== "undefined"
  const storedLocale = canPersist ? localStorage.getItem(persistLocaleKey) : undefined

  let locale = storedLocale || defaultLocale

  let polyglot = createPolyglotInstance(locale, getMessages(locale), polyglotOptions)

  const provider: I18nProvider = {
    translate: (key, options) => {
      return polyglot.t(key, { ...options, _: options?.defaultValue })
    },
    getLocale: () => {
      return locale
    },
    changeLocale: async (newLocale) => {
      polyglot = createPolyglotInstance(
        newLocale,
        getMessages(newLocale),
        polyglotOptions
      )

      locale = newLocale

      if (canPersist) {
        localStorage.setItem(persistLocaleKey, newLocale)
      }
    },
  }

  return provider
}

export async function createPolyglotI18nProviderAsync(
  config: PolyglotI18nProviderConfigAsync
) {
  const {
    defaultLocale,
    getMessages,
    persistLocale = true,
    persistLocaleKey = DEFAULT_PERSIST_LOCALE_KEY,
    polyglotOptions,
  } = config

  const canPersist = persistLocale && typeof localStorage !== "undefined"
  const storedLocale = canPersist ? localStorage.getItem(persistLocaleKey) : undefined

  let locale = storedLocale || defaultLocale

  let polyglot = createPolyglotInstance(
    locale,
    await getMessages(locale),
    polyglotOptions
  )

  const provider: I18nProvider = {
    translate: (key, options) => {
      return polyglot.t(key, { ...options, _: options?.defaultValue })
    },
    getLocale: () => {
      return locale
    },
    changeLocale: async (newLocale) => {
      polyglot = createPolyglotInstance(
        newLocale,
        await getMessages(newLocale),
        polyglotOptions
      )

      locale = newLocale

      if (canPersist) {
        localStorage.setItem(persistLocaleKey, newLocale)
      }
    },
  }

  return provider
}
