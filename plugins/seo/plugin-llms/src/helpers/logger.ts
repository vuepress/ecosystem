import pc from 'picocolors'

/** Logger utility to provide consistent and styled logging throughout the plugin. | 日志工具，为插件提供一致且带样式的日志输出。 */
const log = {
  /**
   * Logs an info message to the console. | 在控制台输出信息级别的日志。
   * @param message - The message to log. | 要记录的消息。
   */
  info: (message: string): void => {
    console.log(`${pc.blue('info')} ${message}`)
  },

  /**
   * Logs a success message to the console. | 在控制台输出成功级别的日志。
   * @param message - The message to log. | 要记录的消息。
   */
  success: (message: string): void => {
    console.log(`${pc.green('success')} ${message}`)
  },

  /**
   * Logs a warning message to the console. | 在控制台输出警告级别的日志。
   * @param message - The message to log. | 要记录的消息。
   */
  warn: (message: string): void => {
    console.log(`${pc.yellow('warning')} ${message}`)
  },

  /**
   * Logs an error message to the console. | 在控制台输出错误级别的日志。
   * @param message - The message to log. | 要记录的消息。
   */
  error: (message: string): void => {
    console.log(`${pc.red('error')} ${message}`)
  },
}

export default log
