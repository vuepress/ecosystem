import { vi } from 'vitest'
import { logger } from 'vuepress/utils'

/**
 * Mocked logger methods
 *
 * 被 mock 的 logger 方法
 */
export interface LoggerMocks {
  /**
   * Mock of `logger.info`
   *
   * `logger.info` 的 mock
   */
  info: ReturnType<typeof vi.fn>

  /**
   * Mock of `logger.warn`
   *
   * `logger.warn` 的 mock
   */
  warn: ReturnType<typeof vi.fn>

  /**
   * Mock of `logger.error`
   *
   * `logger.error` 的 mock
   */
  error: ReturnType<typeof vi.fn>

  /**
   * Mock of `logger.success`
   *
   * `logger.success` 的 mock
   */
  success: ReturnType<typeof vi.fn>

  /**
   * Mock of `logger.tip`
   *
   * `logger.tip` 的 mock
   */
  tip: ReturnType<typeof vi.fn>

  /**
   * Restore every mocked method
   *
   * 还原所有被 mock 的方法
   */
  restore: () => void
}

const silence = (): undefined => undefined

/**
 * Mock the VuePress logger
 *
 * It silences the VuePress logs, and returns the spies so that the logged
 * messages can be asserted.
 *
 * 伪造 VuePress logger
 *
 * 它会静默 VuePress 日志，并返回间谍函数以便对日志内容进行断言。
 *
 * @example
 *   const { warn, restore } = mockLogger()
 *
 *   expect(warn).toHaveBeenCalledWith(expect.stringContaining('not found'))
 *
 *   restore()
 *
 * @returns The mocked logger methods / 被 mock 的 logger 方法
 */
export const mockLogger = (): LoggerMocks => {
  const info = vi.spyOn(logger, 'info').mockImplementation(silence)
  const tip = vi.spyOn(logger, 'tip').mockImplementation(silence)
  const warn = vi.spyOn(logger, 'warn').mockImplementation(silence)
  const error = vi.spyOn(logger, 'error').mockImplementation(silence)
  const success = vi.spyOn(logger, 'success').mockImplementation(silence)

  return {
    error,
    info,
    restore: (): void => {
      info.mockRestore()
      tip.mockRestore()
      warn.mockRestore()
      error.mockRestore()
      success.mockRestore()
    },
    success,
    tip,
    warn,
  }
}
