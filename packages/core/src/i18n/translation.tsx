import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { logError } from "../helpers/console"
import { RefreshSignal } from "../helpers/refreshSignal"
import { useNotify } from "../notify"
import { coreMessages } from "./messages"

export type I18nProvider = {
  translate: (key: string, options?: any) => string
  changeLocale: (locale: string) => Promise<void>
  getLocale: () => string
  getRefreshSignal?: () => RefreshSignal
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

  const [locale, setLocale] = useState(i18nProvider.getLocale())

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
        notify(coreMessages.mool.core.i18n.change_locale_error, {
          type: "danger",
        })
      }
    },
    [locale, i18nProvider]
  )

  // Refresh locale when asked by the provider
  useEffect(() => {
    if (!i18nProvider.getRefreshSignal) {
      return
    }

    const signal = i18nProvider.getRefreshSignal()
    const disposer = signal.addListener(() => {
      updateLocale(i18nProvider.getLocale())
    })
    return disposer
  }, [i18nProvider, updateLocale])

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
