import type { PluginObject } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

/**
 * Options for RTL plugin
 *
 * RTL 插件选项
 */
export interface RTLPluginOptions {
  /**
   * RTL locales
   *
   * RTL 语言路径
   *
   * @default ['/']
   */
  locales?: string[]

  /**
   * RTL selector
   *
   * RTL 选择器
   *
   * @default { 'html': { dir: 'rtl' } }
   */
  selector?: {
    [cssSelector: string]: {
      // oxlint-disable-next-line typescript/consistent-indexed-object-style
      [attr: string]: string
    }
  }
}

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * Create RTL plugin
 *
 * 创建 RTL 插件
 *
 * @param options - Plugin options
 *
 * @example
 * ```ts
 * import { rtlPlugin } from '@vuepress/plugin-rtl'
 *
 * export default {
 *   plugins: [
 *     rtlPlugin({
 *       locales: ['/ar/', '/he/'],
 *       selector: { 'html': { dir: 'rtl' } }
 *     })
 *   ]
 * }
 * ```
 */
export const rtlPlugin = (options: RTLPluginOptions = {}): PluginObject => ({
  name: '@vuepress/plugin-rtl',

  define: {
    __RTL_LOCALES__: Array.isArray(options.locales) ? options.locales : ['/'],
    __RTL_SELECTOR__: options.selector ?? { html: { dir: 'rtl' } },
  },

  clientConfigFile: path.join(__dirname, '../client/config.js'),
})
