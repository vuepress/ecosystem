import type { App, Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

import { codeTree } from './codeTree.js'
import { embedCodeTree } from './embedCodeTree.js'
import type { MarkdownCodeTreePluginOptions } from './options.js'
import type { CodeTreeEnv } from './renderCodeTree.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * Markdown Code Tree Plugin
 *
 * This plugin is used to put code blocks of several files together, and display
 * them with a file tree, so that the structure of a small template is clear at
 * a glance.
 *
 * Markdown 代码树插件
 *
 * 该插件用于将多个文件的代码块聚合在一起，并配合文件树展示， 让小型模板的结构一目了然。
 *
 * @example
 *   import { markdownCodeTreePlugin } from '@vuepress/plugin-markdown-code-tree'
 *
 *   export default {
 *     plugins: [markdownCodeTreePlugin()],
 *   }
 */
export const markdownCodeTreePlugin =
  (options: MarkdownCodeTreePluginOptions = {}): Plugin =>
  (app: App) => ({
    name: '@vuepress/plugin-markdown-code-tree',

    extendsMarkdown: (md) => {
      md.use(codeTree, options)
      md.use(embedCodeTree, app, options)
    },

    extendsPage: (page) => {
      const { codeTreeFiles = [] } = page.markdownEnv as CodeTreeEnv

      if (codeTreeFiles.length) page.deps.push(...codeTreeFiles)
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
  })
