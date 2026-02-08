import type { Plugin } from 'vuepress/core'
import { isFunction } from 'vuepress/shared'
import { getDirname, path } from 'vuepress/utils'
import { PLUGIN_NAME, logger } from './logger.js'
import type { WatermarkPluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * VuePress watermark plugin
 *
 * VuePress 水印插件
 *
 * @example
 * ```ts
 * import { watermarkPlugin } from '@vuepress/plugin-watermark'
 *
 * export default {
 *   plugins: [
 *     watermarkPlugin({
 *       enabled: true,
 *       watermarkOptions: {
 *         content: 'My Site',
 *         fontColor: '#666',
 *         opacity: 0.3,
 *       },
 *     }),
 *   ],
 * }
 * ```
 */
export const watermarkPlugin =
  ({ enabled = true, ...options }: WatermarkPluginOptions = {}): Plugin =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    return {
      name: PLUGIN_NAME,

      define: {
        __WM_GLOBAL__: enabled === true,
        __WM_OPTIONS__: options.watermarkOptions ?? {},
      },

      extendsPage: (page) => {
        // When watermark is a filter function, enable watermark for matching pages.
        if (isFunction(enabled)) {
          const { frontmatter } = page

          if (!('watermark' in frontmatter) && enabled(page)) {
            frontmatter.watermark = true
          }
        }
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
