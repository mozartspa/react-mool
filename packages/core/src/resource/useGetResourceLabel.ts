import inflection from "inflection"
import { useCallback } from "react"
import { useTranslate } from "../i18n"

export function useGetResourceLabel() {
  const translate = useTranslate()

  return useCallback(
    (resource: string, count: number = 1) => {
      const defaultValue = inflection.humanize(
        count === 1 ? inflection.singularize(resource) : inflection.pluralize(resource)
      )

      return translate(`resources.${resource}.label`, {
        smart_count: count,
        defaultValue,
      })
    },
    [translate]
  )
}
