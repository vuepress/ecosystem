import { getFullLocaleConfig } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

import { previewLocaleInfo } from './locales.js'
import type { MarkdownPreviewPluginOptions } from './options.js'
import { preview } from './preview.js'

const PLUGIN_NAME = '@vuepress/plugin-markdown-preview'

const __dirname = getDirname(import.meta.url)

/**
 * Markdown preview plugin
 *
 * Markdown 预览插件
 *
 * @param options - plugin options / 插件选项
 *
 * @example
 * ```ts
 * import { markdownPreviewPlugin } from '@vuepress/plugin-markdown-preview'
 *
 * export default {
 *   plugins: [
 *     markdownPreviewPlugin(),
 *   ],
 * }
 * ```
 */
export const markdownPreviewPlugin =
  (options: MarkdownPreviewPluginOptions = {}): Plugin =>
  (app) => ({
    name: PLUGIN_NAME,

    define: (): Record<string, unknown> => ({
      __PREVIEW_LOCALES__: getFullLocaleConfig({
        app,
        name: PLUGIN_NAME,
        default: previewLocaleInfo,
        config: options.locales,
      }),
    }),

    extendsMarkdown: (md) => {
      md.use(preview)
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
  })
