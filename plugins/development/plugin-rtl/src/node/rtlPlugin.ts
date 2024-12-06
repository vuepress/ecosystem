import type { PluginObject } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

export interface RTLPluginOptions {
  /**
   * RTL locales
   *
   * @default ['/']
   */
  locales?: string[]

  /**
   * RTL selector
   *
   * @default { 'html': { dir: 'rtl' } }
   */
  selector?: {
    [cssSelector: string]: {
      [attr: string]: string
    }
  }
}

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const rtlPlugin = (options: RTLPluginOptions = {}): PluginObject => ({
  name: '@vuepress/plugin-rtl',

  define: {
    __RTL_LOCALES__: Array.isArray(options.locales) ? options.locales : ['/'],
    __RTL_SELECTOR__: options.selector ?? { html: { dir: 'rtl' } },
  },

  clientConfigFile: path.join(__dirname, '../client/config.js'),
})
