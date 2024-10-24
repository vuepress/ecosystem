import { getRealPath } from '@vuepress/helper'
import type { App } from 'vuepress'

const { url } = import.meta

export const prepareConfigFile = (app: App): Promise<string> =>
  app.writeTemp(
    `markdown-ext/config.js`,
    `\
import "${getRealPath('@mdit/plugin-spoiler/style', url)}";
`,
  )
