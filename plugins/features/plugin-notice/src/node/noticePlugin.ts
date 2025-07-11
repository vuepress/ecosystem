import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { PLUGIN_NAME, logger } from './logger.js'
import type { NoticePluginOptions } from './options.js'
import {
  prepareNoticeOptions,
  watchNoticeOptions,
} from './prepareNoticeOptions.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * VuePress notice plugin
 *
 * VuePress 通知插件
 *
 * @param options - Plugin options / 插件选项
 *
 * @example
 * ```ts
 * import { noticePlugin } from '@vuepress/plugin-notice'
 *
 * export default {
 *   plugins: [
 *     noticePlugin({
 *       config: [
 *         {
 *           path: '/',
 *           title: 'Notice Title',
 *           content: 'Notice Content',
 *           actions: [
 *             {
 *               text: 'Primary Action',
 *               link: 'https://example.com',
 *               type: 'primary',
 *             },
 *           ],
 *         },
 *       ],
 *     }),
 *   ],
 * }
 * ```
 */
export const noticePlugin =
  (options: NoticePluginOptions): Plugin =>
  (app) => {
    if (app.env.isDebug) logger.info('Options', options)

    return {
      name: PLUGIN_NAME,

      onPrepared: async () => {
        await prepareNoticeOptions(app, options.config)
      },

      onWatched: (_, watchers) => {
        watchers.push(watchNoticeOptions(app, options.config))
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
