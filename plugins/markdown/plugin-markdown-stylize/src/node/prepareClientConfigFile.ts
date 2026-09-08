import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'

import type { MarkdownStylizePluginOptions } from './options.js'

const PLUGIN_NAME = '@vuepress/plugin-markdown-stylize'

export const prepareClientConfigFile = (
  app: App,
  { spoiler, steps }: Pick<MarkdownStylizePluginOptions, 'spoiler' | 'steps'>,
): Promise<string> => {
  let content = ''

  if (spoiler) {
    content += `\
import "${getModulePath('@mdit/plugin-spoiler/style', import.meta)}"\n
`
  }

  if (steps) {
    content += `\
import "${getModulePath(`${PLUGIN_NAME}/steps.css`, import.meta)}"\n
`
  }

  return app.writeTemp(
    'markdown-stylize/config.js',
    `\
${content}
`,
  )
}
