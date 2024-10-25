import type { App } from 'vuepress/core'
import { getIdPrefix, getPath } from '../utils.js'

export const prepareConfigSass = (
  app: App,
  id: string,
  defaultConfig: string,
  userConfig: string,
): Promise<string> =>
  app.writeTemp(
    `sass-palette/${getIdPrefix(id)}config.scss`,
    `\
@import "file:///${getPath(defaultConfig)}";
@import "file:///${getPath(userConfig)}";
`,
  )
