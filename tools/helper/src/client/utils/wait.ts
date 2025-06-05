/**
 * Wait for a given time
 *
 * 等待指定时间
 *
 * @param ms - Wait time in milliseconds / 等待时间（毫秒）
 *
 * @returns A promise that resolves after the given time / 在指定时间后解析的 Promise
 */
export const wait = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
