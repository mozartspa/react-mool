import { PolyglotMessages } from "./polyglot"

function combine(parentPath: string | undefined, key: string) {
  // Check that parentPath and key are correct (only in dev)
  if (process.env.NODE_ENV !== "production") {
    if (parentPath && parentPath.endsWith(".")) {
      throw new Error(
        `Parent path cannot end with the "." character. Found in: ${parentPath}`
      )
    }
    if (key.includes(".")) {
      throw new Error(
        `Message key cannot contain the "." character. Found in "${parentPath}.${key}". Key was "${key}".`
      )
    }
  }

  if (!parentPath) {
    return key
  } else {
    return `${parentPath}.${key}`
  }
}

export function buildTranslationKeys<T extends PolyglotMessages>(
  messages: T,
  parentPath?: string
): T {
  let result = {} as any

  Object.keys(messages).forEach((key) => {
    const value = messages[key]
    if (typeof value === "string") {
      result[key] = combine(parentPath, key)
    } else {
      result[key] = buildTranslationKeys(value, combine(parentPath, key))
    }
  })

  return result
}
