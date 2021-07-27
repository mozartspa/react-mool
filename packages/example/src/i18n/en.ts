import { buildTranslationKeys, englishCoreMessages } from "@react-mool/core"
import { englishEuiMessages } from "@react-mool/eui"

export const englishMessages = {
  ...englishCoreMessages,
  ...englishEuiMessages,
  show: "Show",
  open: "Open",
  close: "Close",
  resources: {
    product: {
      filter: {
        q: "Search",
        price_lt: "Price lower than",
        category_id: "Category",
        category_id_placeholder: "Select a category...",
      },
    },
  },
}

export const t = buildTranslationKeys(englishMessages)

export type Messages = typeof englishMessages
