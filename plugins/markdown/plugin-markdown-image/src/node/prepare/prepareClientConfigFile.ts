import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'
import type { MarkdownImagePluginOptions } from '../options.js'
import { PLUGIN_NAME } from '../utils.js'

export const prepareClientConfigFile = async (
  app: App,
  { figure, mark }: MarkdownImagePluginOptions,
): Promise<string> => {
  let content = ''

  if (figure) {
    content += `\
import "${getModulePath(`${PLUGIN_NAME}/figure.css`, import.meta)}"
`
  }

  if (mark) {
    content += `\
import "${getModulePath(`${PLUGIN_NAME}/mark.css`, import.meta)}"
`
  }

  return app.writeTemp(
    'markdown-image/client.js',
    `\
${content}
`,
  )
}
