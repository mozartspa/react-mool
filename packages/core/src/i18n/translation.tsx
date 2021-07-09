import React, { ReactNode, useCallback, useMemo, useState } from "react"
import { logError } from "../helpers/console"
import { useNotify } from "../notify"

export type I18nProvider = {
  translate: (key: string, options?: any) => string
  changeLocale: (locale: string) => Promise<void>
  getInitialLocale: () => string
}

export const defaultI18nProvider: I18nProvider = {
  translate: (key) => key,
  changeLocale: async () => {},
  getInitialLocale: () => "",
}

export type TranslationContextValue = {
  locale: string
  setLocale: (locale: string) => Promise<void>
  i18nProvider: I18nProvider
}

export const TranslationContext = React.createContext<
  TranslationContextValue | undefined
>(undefined)

export function useTranslationContext() {
  const context = React.useContext(TranslationContext)
  if (!context) {
    throw new Error(`TranslationContext not found.`)
  }
  return context
}

export type TranslationContextProviderProps = {
  i18nProvider: I18nProvider
  children?: ReactNode
}

export function TranslationContextProvider(props: TranslationContextProviderProps) {
  const { i18nProvider, children } = props

  const [locale, setLocale] = useState(i18nProvider.getInitialLocale())

  const notify = useNotify()

  const updateLocale = useCallback(
    async (newLocale: string) => {
      // don't ask provider to change locale if it is equal to the current one.
      if (newLocale === locale) {
        return
      }

      try {
        await i18nProvider.changeLocale(newLocale)
        setLocale(newLocale)
      } catch (error) {
        logError(error)
        notify("Failed to load the translations for the specified language", {
          type: "danger",
        })
      }
    },
    [locale, i18nProvider]
  )

  const context: TranslationContextValue = useMemo(
    () => ({
      locale,
      setLocale: updateLocale,
      i18nProvider,
    }),
    [locale, updateLocale, i18nProvider]
  )

  return <TranslationContext.Provider value={context} children={children} />
}

export function useTranslate() {
  const { i18nProvider } = useTranslationContext()

  return i18nProvider.translate
}

export function useLocale() {
  const { locale } = useTranslationContext()

  return locale
}

export function useSetLocale() {
  const { setLocale } = useTranslationContext()

  return setLocale
}
