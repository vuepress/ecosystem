import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'

import type { MarkdownFieldPluginOptions } from './options.js'

const PLUGIN_NAME = '@vuepress/plugin-markdown-field'

export const prepareClientConfigFile = (
  app: App,
  { fields }: Pick<MarkdownFieldPluginOptions, 'fields'>,
): Promise<string> => {
  const imports = fields
    ? `import "${getModulePath(`${PLUGIN_NAME}/field.css`, import.meta)}"\n`
    : ''

  return app.writeTemp(
    'markdown-field/config.js',
    `\
${imports}
`,
  )
}
