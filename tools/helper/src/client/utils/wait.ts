/**
 * Wait for a given time
 *
 * @param ms wait time in milliseconds
 * @returns a promise that resolves after the given time
 */
export const wait = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
