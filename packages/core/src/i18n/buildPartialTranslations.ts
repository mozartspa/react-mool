import merge from "lodash.merge"
import { PolyglotMessages } from "./polyglot"

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export function buildPartialTranslations<T extends PolyglotMessages>(
  defaultTranslations: T,
  partialTranslations: DeepPartial<T>
) {
  return merge({}, defaultTranslations, partialTranslations)
}
