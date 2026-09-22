import type { App, Plugin } from 'vuepress/core'

import { codeTree as codeTreePlugin } from './codeTree/codeTree.js'
import { embedCodeTree } from './codeTree/embedCodeTree.js'
import type { CodeTreeEnv } from './codeTree/renderCodeTree.js'
import { PLUGIN_NAME } from './constants.js'
import { fileTree as fileTreePlugin } from './fileTree.js'
import type { MarkdownFileTreePluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'

/**
 * Markdown File Tree Plugin
 *
 * This plugin renders a directory structure in VuePress, either from Markdown
 * unordered lists (file tree), or from the code blocks of several files (code
 * tree).
 *
 * Markdown 文件树插件
 *
 * 该插件在 VuePress 中渲染目录结构，既可以来自 Markdown 无序列表（文件树）， 也可以来自多个文件的代码块（代码树）。
 *
 * @example
 *   import { markdownFileTreePlugin } from '@vuepress/plugin-markdown-file-tree'
 *
 *   export default {
 *     plugins: [
 *       markdownFileTreePlugin({
 *         fileTree: true,
 *         codeTree: { height: '400px' },
 *       }),
 *     ],
 *   }
 */
export const markdownFileTreePlugin =
  (options: MarkdownFileTreePluginOptions = {}): Plugin =>
  (app: App) => {
    const fileTreeEnabled = options.fileTree ?? false
    const codeTreeEnabled = Boolean(options.codeTree)
    const codeTreeOptions =
      typeof options.codeTree === 'object' ? options.codeTree : {}

    // Skip every hook when neither feature is enabled
    if (!fileTreeEnabled && !codeTreeEnabled) return { name: PLUGIN_NAME }

    const plugin: Plugin = {
      name: PLUGIN_NAME,

      extendsMarkdown: (md) => {
        if (fileTreeEnabled) md.use(fileTreePlugin)

        if (codeTreeEnabled) {
          md.use(codeTreePlugin, codeTreeOptions)
          md.use(embedCodeTree, app, codeTreeOptions)
        }
      },

      clientConfigFile: () => prepareClientConfigFile(app, options),
    }

    // Only the embedded code tree reads files from the source directory
    if (codeTreeEnabled) {
      plugin.extendsPage = (page) => {
        const { codeTreeFiles = [] } = page.markdownEnv as CodeTreeEnv

        if (codeTreeFiles.length) page.deps.push(...codeTreeFiles)
      }
    }

    return plugin
  }
