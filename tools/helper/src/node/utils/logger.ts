/* eslint-disable no-console */
import { colors, ora } from 'vuepress/utils'

type Ora = ReturnType<typeof ora>

/**
 * Logger utils
 */
export class Logger {
  public constructor(
    /**
     * Plugin/Theme name
     */
    private readonly name = '',
  ) {}

  private init(text: string): Ora {
    return ora({
      prefixText: colors.blue(`${this.name}: `) || '',
      text,
    })
  }

  /**
   * Create a loading spinner with text
   */
  public load(msg: string): {
    succeed: (text?: string) => void
    fail: (text?: string) => void
  } {
    const instance = this.init(msg)

    return {
      succeed: (text?: string) => instance.succeed(text),
      fail: (text?: string) => instance.succeed(text),
    }
  }

  /**
   * Log info msg
   *
   * @param text Hint text
   * @returns Ora Instance
   */
  public info(text = '', ...args: unknown[]): void {
    this.init(colors.blue(text)).info()

    if (args.length) console.info(...args)
  }

  /**
   * Log success msg
   */
  public succeed(text = '', ...args: unknown[]): void {
    this.init(colors.green(text)).succeed()

    if (args.length) console.log(...args)
  }

  /**
   * Log warning msg
   */
  public warn(text = '', ...args: unknown[]): void {
    this.init(colors.yellow(text)).warn()

    if (args.length) console.warn(...args)
  }

  /**
   * Log error msg
   */
  public error(text = '', ...args: unknown[]): void {
    this.init(colors.red(text)).fail()

    if (args.length) console.error(...args)
  }
}
