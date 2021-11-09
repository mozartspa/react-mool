import { reaction, toJS } from "mobx"
import { DependencyList, useEffect, useState } from "react"
import { useUpdateEffect } from "rooks"

export function useObserveMobxValue<TValue = any>(
  mobxValueAccessor: () => TValue,
  deps: DependencyList = []
): TValue {
  const [value, setValue] = useState(() => toJS(mobxValueAccessor()))

  useEffect(
    () =>
      reaction(
        () => toJS(mobxValueAccessor()),
        (data) => setValue(data)
      ),
    deps
  )

  useUpdateEffect(() => {
    setValue(toJS(mobxValueAccessor()))
  }, deps as any[])

  return value
}
