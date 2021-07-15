import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

type Listener = () => void

function createSignal() {
  let listeners: Listener[] = []

  return {
    addListener: (listener: Listener) => {
      listeners.push(listener)

      return () => {
        listeners = listeners.filter((o) => o !== listener)
      }
    },

    fire: () => {
      listeners.forEach((listener) => listener())
    },
  }
}

const useIsomorphicEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

function useForceUpdate() {
  const [_, setState] = useState(Object.create(null))
  return useCallback(() => {
    setState(Object.create(null))
  }, [])
}

type StackEntry<T> = {
  data: T
}

type ConsumerProps<T> = {
  children: (data: T[]) => ReactNode
}

type ProducerProps<T> = {
  data: T
}

export function createStackCollector<T = any>() {
  const mountSignal = createSignal()
  const updateSignal = createSignal()
  let stack: StackEntry<T>[] = []

  function push(data: T) {
    const entry: StackEntry<T> = { data }
    stack.push(entry)
    updateSignal.fire()
    return entry
  }

  function pop(entry: StackEntry<T>) {
    const index = stack.indexOf(entry)
    if (index !== -1) {
      stack.splice(index, 1)
      updateSignal.fire()
    }
  }

  function replace(entry: StackEntry<T>, data: T) {
    const index = stack.indexOf(entry)
    if (index !== -1) {
      stack[index].data = data
      updateSignal.fire()
    }
  }

  const Consumer = ({ children }: ConsumerProps<T>) => {
    const forceUpdate = useForceUpdate()

    // When update signal fires, trigger re-render
    useIsomorphicEffect(() => {
      return updateSignal.addListener(() => forceUpdate())
    }, [])

    return <>{children(stack.map((o) => o.data))}</>
  }

  const Producer = ({ data }: ProducerProps<T>) => {
    const [registerCounter, setRegisterCounter] = useState(0)
    const entryRef = useRef<StackEntry<T>>()

    // When mount signal fires, trigger registration
    useIsomorphicEffect(() => {
      return mountSignal.addListener(() => {
        setRegisterCounter((c) => c + 1)
      })
    }, [])

    // Signal mount and unmount events
    useIsomorphicEffect(() => {
      mountSignal.fire()
      return () => mountSignal.fire()
    }, [])

    // Register/unregister to the stack
    useIsomorphicEffect(() => {
      entryRef.current = push(data)
      return () => {
        if (entryRef.current) {
          pop(entryRef.current)
          entryRef.current = undefined
        }
      }
    }, [registerCounter])

    // Update stack entry when data changes
    useIsomorphicEffect(() => {
      if (entryRef.current) {
        replace(entryRef.current, data)
      }
    }, [data])

    return null
  }

  return {
    Consumer,
    Producer,
  }
}
