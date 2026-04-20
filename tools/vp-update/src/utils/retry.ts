/**
 * Retry a async function
 *
 * @example
 *   const result = await retry(
 *     async () => {
 *       return await fetch('https://example.com').then((res) => res.json())
 *     },
 *     { limit: 3, delay: 1000 },
 *   )
 *
 * @param fn - The function to retry
 * @param times - The number of times to retry, default is 3
 * @param reject - The function to handle retry error
 * @returns The result of the function if it succeeds, otherwise throws the last
 *   error
 */
export const retry = <ReturnType>(
  fn: () => Promise<ReturnType>,
  times = 3,
  reject?: (attempts: number, err: unknown) => void,
): Promise<ReturnType> => {
  let attempts = 0
  const run = async (): Promise<ReturnType> => {
    try {
      return await fn()
    } catch (err: unknown) {
      attempts += 1
      if (attempts < times) {
        reject?.(attempts, err)
        return run()
      }
      throw err
    }
  }

  return run()
}
