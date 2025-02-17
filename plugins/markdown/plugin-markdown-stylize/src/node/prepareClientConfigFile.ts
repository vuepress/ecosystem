import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'

export const prepareClientConfigFile = (
  app: App,
  { spoiler }: Record<string, unknown>,
): Promise<string> =>
  app.writeTemp(
    `markdown-stylize/config.js`,
    `\
${spoiler ? `import "${getModulePath('@mdit/plugin-spoiler/style', import.meta)}"\n` : ''}\n
`,
  )
