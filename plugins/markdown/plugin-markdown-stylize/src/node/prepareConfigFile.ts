import { getRealPath } from '@vuepress/helper'
import type { App } from 'vuepress'

const { url } = import.meta

export const prepareConfigFile = (
  app: App,
  { spoiler }: Record<string, unknown>,
): Promise<string> =>
  app.writeTemp(
    `markdown-ext/config.js`,
    `\
${spoiler ? `import "${getRealPath('@mdit/plugin-spoiler/style', url)}"\n` : ''}\n
`,
  )
