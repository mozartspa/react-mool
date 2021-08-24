import { useTranslate, UseTranslateResult } from "@react-mool/core"
import inflection from "inflection"
import { useCallback } from "react"

export type UseGetFieldLabelResult = (resource: string, name: string) => string

export function useGetFieldLabel(): UseGetFieldLabelResult {
  const translate = useTranslate()

  const getLabel = useCallback(
    (resource: string, name: string) => {
      return getFieldLabel(resource, name, translate)
    },
    [translate]
  )

  return getLabel
}

export function getFieldLabel(
  resource: string,
  name: string,
  translate: UseTranslateResult
) {
  return translate(`resources.${resource}.fields.${name}`, {
    defaultValue: inflection.humanize(name),
  })
}
