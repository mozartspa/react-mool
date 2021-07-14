type Listener = () => void

type Disposer = () => void

export type RefreshSignal = {
  addListener: (listener: () => void) => Disposer
  requestRefresh: () => void
}

export function createRefreshSignal(): RefreshSignal {
  let listeners: Listener[] = []

  return {
    addListener: (listener) => {
      listeners.push(listener)

      return () => {
        listeners = listeners.filter((o) => o !== listener)
      }
    },

    requestRefresh: () => {
      listeners.forEach((listener) => listener())
    },
  }
}
