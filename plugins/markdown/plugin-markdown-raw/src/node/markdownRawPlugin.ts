import type { Plugin } from 'vuepress/core'

import { applyIsolateStyles } from './applyIsolateStyles.js'
import { raw } from './markdown-it-plugins/raw.js'
import type { MarkdownRawPluginOptions } from './options.js'

/**
 * Create a markdown raw plugin
 *
 * 创建 markdown raw 插件
 *
 * The plugin registers the `raw` container, and can isolate the page styles
 * from its content.
 *
 * 该插件注册 `raw` 容器，并可将页面样式与容器的内容隔离。
 *
 * @example
 *   import { markdownRawPlugin } from '@vuepress/plugin-markdown-raw'
 *
 *   export default {
 *     plugins: [
 *       markdownRawPlugin({
 *         // isolate the page styles from the raw container
 *         isolateStyles: true,
 *       }),
 *     ],
 *   }
 *
 * @param options - Plugin options / 插件选项
 * @returns VuePress plugin / VuePress 插件
 */
export const markdownRawPlugin = ({
  isolateStyles = false,
}: MarkdownRawPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-markdown-raw',

  extendsMarkdown: (md): void => {
    raw(md)
  },

  extendsBundlerOptions: (bundlerOptions, app): void => {
    if (!isolateStyles) return

    applyIsolateStyles(
      bundlerOptions,
      app,
      isolateStyles === true ? {} : isolateStyles,
    )
  },
})
