import { createPolyglotI18nProvider, englishCoreMessages } from "@react-mool/core"
import { englishEuiMessages } from "./messages"

export const defaultI18nProvider = createPolyglotI18nProvider({
  defaultLocale: "en",
  getMessages: () => {
    return {
      ...englishCoreMessages,
      ...englishEuiMessages,
    }
  },
})
