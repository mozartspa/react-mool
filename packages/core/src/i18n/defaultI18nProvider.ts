import { I18nProvider } from "./translation"

export const defaultI18nProvider: I18nProvider = {
  translate: (key) => key,
  changeLocale: async () => {},
  getLocale: () => "",
}
