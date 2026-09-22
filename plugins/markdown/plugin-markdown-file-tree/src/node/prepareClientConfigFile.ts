import type { App } from 'vuepress/core'

import { CLIENT_FOLDER } from './constants.js'
import type { MarkdownFileTreePluginOptions } from './options.js'

/**
 * Generate the client config file, which registers the components required by
 * the enabled features
 *
 * 生成客户端配置文件，注册已启用功能所需的组件
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param options - Plugin options / 插件选项
 * @returns Path of the generated client config file / 生成的客户端配置文件的路径
 */
export const prepareClientConfigFile = (
  app: App,
  { fileTree = false, codeTree = false }: MarkdownFileTreePluginOptions,
): Promise<string> => {
  const imports = new Set<string>()
  const registrations = new Set<string>()

  // The file tree node is shared by both features
  if (fileTree || codeTree) {
    imports.add(
      `import { FileTreeNode } from '${CLIENT_FOLDER}components/FileTreeNode.js'`,
    )
    registrations.add(`app.component('FileTreeNode', FileTreeNode)`)
  }

  if (fileTree) {
    imports.add(
      `import { FileTree } from '${CLIENT_FOLDER}components/FileTree.js'`,
    )
    registrations.add(`app.component('FileTree', FileTree)`)
  }

  if (codeTree) {
    imports.add(
      `import { CodeTree } from '${CLIENT_FOLDER}components/CodeTree.js'`,
    )
    registrations.add(`app.component('CodeTree', CodeTree)`)
  }

  return app.writeTemp(
    'markdown-file-tree/config.js',
    `\
import { defineClientConfig } from 'vuepress/client'
${[...imports].join('\n')}

export default defineClientConfig({
  enhance({ app }) {
    ${[...registrations].join('\n    ')}
  },
})
`,
  )
}
