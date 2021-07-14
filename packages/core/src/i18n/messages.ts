import { buildTranslationKeys } from "./buildTranslationKeys"

export const englishCoreMessages = {
  core: {
    crud: {
      created: "Element created",
      updated: "Element updated",
      deleted: "Element deleted",
      invalid_form: "The form is not valid. Please check for errors",
      item_not_found: "Element not found",
    },
    i18n: {
      change_locale_error: "Failed to load the translations for the specified language",
    },
  },
}

export const t = buildTranslationKeys(englishCoreMessages)

export type CoreMessages = typeof englishCoreMessages
