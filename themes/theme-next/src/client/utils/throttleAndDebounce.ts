export const throttleAndDebounce = (
  fn: () => void,
  delay: number,
): (() => void) => {
  let timeoutId: NodeJS.Timeout | null = null
  let called = false

  return () => {
    if (timeoutId) clearTimeout(timeoutId)

    if (!called) {
      fn()
      called = true
      setTimeout(() => {
        called = false
      }, delay)
    } else timeoutId = setTimeout(fn, delay)
  }
}
