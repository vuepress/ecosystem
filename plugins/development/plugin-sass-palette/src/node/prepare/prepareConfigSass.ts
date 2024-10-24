import type { App } from 'vuepress/core'
import { getFileContent, getIdPrefix } from '../utils.js'

export const prepareConfigSass = async (
  app: App,
  id: string,
  defaultConfig: string,
  userConfig: string,
): Promise<string> => {
  const contents = await Promise.all([
    getFileContent(defaultConfig),
    getFileContent(userConfig),
  ])

  return app.writeTemp(
    `sass-palette/${getIdPrefix(id)}config.scss`,
    `${contents.join('\n')}\n`,
  )
}
