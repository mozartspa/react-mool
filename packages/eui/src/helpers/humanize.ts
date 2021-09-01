import inflection from "inflection"

export function humanize(value: string | null | undefined) {
  if (!value) {
    return ""
  }

  return inflection.humanize(String(value).replace(/\./gi, " "))
}
