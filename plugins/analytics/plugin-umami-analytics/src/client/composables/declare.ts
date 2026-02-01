declare global {
  interface Window {
    umami: {
      track: {
        (payload?: Record<string, unknown>): void
        (name: string, data?: Record<string, unknown>): void
      }
    }
  }
}

export {}
