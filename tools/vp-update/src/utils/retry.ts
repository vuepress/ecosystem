/**
 * Retry a async function
 *
 * @category Promise
 * @param fn - the function to retry
 * @param times - the number of times to retry, default is 3
 * @param reject - the function to handle retry error
 *
 * @example
 * ```ts
 * const result = await retry(async () => {
 *   return await fetch('https://example.com').then((res) => res.json())
 * }, {  limit: 3, delay: 1000 })
 * ```
 */
export const retry = <T>(
  fn: () => Promise<T>,
  times = 3,
  reject?: (attempts: number, err: unknown) => void,
): Promise<T> => {
  let attempts = 0
  const run = async (): Promise<T> => {
    try {
      return await fn()
    } catch (err: unknown) {
      attempts++
      if (attempts < times) {
        reject?.(attempts, err)
        return run()
      }
      throw err
    }
  }

  return run()
}
