import { EuiContext } from "@elastic/eui"
import type { I18nShape } from "@elastic/eui/src/components/context/context"
import {
  buildTranslationKeys,
  PolyglotMessages,
  useLocale,
  useTranslate,
} from "@react-mool/core"
import { ReactNode, useMemo } from "react"
import { euiTokens } from "./euiTokens"

function extractKeyValues(keys: PolyglotMessages): string[] {
  if (typeof keys === "string") {
    return [keys]
  } else {
    return Object.keys(keys).reduce((values, field) => {
      return values.concat(extractKeyValues(keys[field] as PolyglotMessages))
    }, [] as string[])
  }
}

const euiTokenKeys = buildTranslationKeys(euiTokens)

const euiTokenKeyValues = extractKeyValues(euiTokenKeys)

export type EuiI18nContextProviderProps = {
  children?: ReactNode
}

export const EuiI18nContextProvider = (props: EuiI18nContextProviderProps) => {
  const { children } = props

  const translate = useTranslate()
  const locale = useLocale()

  const i18n: I18nShape = useMemo(() => {
    const mapping = euiTokenKeyValues.reduce((result, token) => {
      result[token] = translate(`euiTokens.${token}`, { defaultValue: "" })
      return result
    }, {} as Record<string, string>)

    return {
      mapping,
      locale,
    }
  }, [translate, locale])

  return <EuiContext i18n={i18n}>{children}</EuiContext>
}
