export * from "./DataTable"

function func<T extends ReadonlyArray<any>>(arg: T): T {
  return arg
}

const x = func([1, "a", true])

function func2<T extends ReadonlyArray<any>>(arg: T): { [K in keyof T]: T[K] } {
  return arg
}

const y = func2([1, "a", true] as const)

const tuple = <T extends any[]>(...t: T) => t

const z = func2(tuple(1, "a", true))

const tuple2 = <T extends readonly any[]>(t: T) => t

const w = tuple2([1, "a", true])
