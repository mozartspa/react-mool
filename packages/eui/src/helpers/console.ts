export function warn(...args: any[]) {
  if (console) {
    console.warn(...args)
  }
}

export function logError(...args: any[]) {
  if (console) {
    console.error(...args)
  }
}
