import { buildTranslationKeys, englishCoreMessages } from "@react-mool/core"
import { englishEuiMessages } from "@react-mool/eui"

export const englishMessages = {
  ...englishCoreMessages,
  ...englishEuiMessages,
  show: "Show",
  open: "Open",
  close: "Close",
}

export const t = buildTranslationKeys(englishMessages)

export type Messages = typeof englishMessages
