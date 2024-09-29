import { getRealPath } from '@vuepress/helper'
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
import "${getRealPath(`${PLUGIN_NAME}/figure.css`, import.meta.url)}"
`
  }

  if (mark) {
    content += `\
import "${getRealPath(`${PLUGIN_NAME}/mark.css`, import.meta.url)}"
`
  }

  return app.writeTemp(
    'markdown-image/client.js',
    `\
${content}
`,
  )
}
