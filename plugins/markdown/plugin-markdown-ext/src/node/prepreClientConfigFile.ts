import type { App } from 'vuepress'
import { CLIENT_FOLDER } from './utils.js'

export const prepareClientConfigFile = (
  app: App,
  { gfm, footnote, tasklist }: Record<string, unknown>,
): Promise<string> =>
  app.writeTemp(
    `markdown-ext/config.js`,
    `\
    ${(footnote ?? gfm) ? `import "${CLIENT_FOLDER}styles/footnote.css"\n` : ''}\
    ${(tasklist ?? gfm) ? `import "${CLIENT_FOLDER}styles/tasklist.css"\n` : ''}\
`,
  )
