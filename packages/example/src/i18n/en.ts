import { buildTranslationKeys, coreMessagesEN } from "@react-mool/core"

export const EN = {
  ...coreMessagesEN,
  show: "Show",
  open: "Open",
  close: "Close",
}

export const messages = buildTranslationKeys(EN)

export type Messages = typeof messages
