export function warn(...args: any[]) {
  if (console) {
    console.warn(...args)
  }
}
