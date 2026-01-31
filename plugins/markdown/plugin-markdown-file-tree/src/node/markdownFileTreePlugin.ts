import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { fileTree } from './fileTree.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 *
 * Markdown File Tree Plugin
 *
 * This plugin is used to parse and render Markdown file trees in VuePress.
 *
 * Markdown 文件树插件
 *
 * 该插件用于在 VuePress 中解析和渲染 Markdown 文件树。
 *
 * @example
 * ```ts
 * import { markdownFileTreePlugin } from '@vuepress/plugin-markdown-file-tree'
 *
 * export default {
 *   plugins: [
 *     markdownFileTreePlugin(),
 *   ],
 * }
 * ```
 */
export const markdownFileTreePlugin = (): Plugin => ({
  name: '@vuepress/plugin-markdown-file-tree',

  extendsMarkdown: (md) => {
    md.use(fileTree)
  },

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
