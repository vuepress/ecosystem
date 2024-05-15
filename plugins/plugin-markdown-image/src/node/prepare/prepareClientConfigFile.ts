import type { App } from 'vuepress'
import type { MarkdownImagePluginOptions } from '../options.js'
import { prepareFigureStyleFile } from './prepareFigureStyleFile.js'
import { prepareMarkStyleFile } from './prepareMarkStyleFile.js'

export const prepareClientConfigFile = async (
  app: App,
  {
    lightmodeSelector = "html[data-theme='light']",
    darkmodeSelector = "html[data-theme='dark']",
    figure,
    mark,
  }: MarkdownImagePluginOptions,
): Promise<string> => {
  let content = ''

  if (figure) {
    content += `\
import "${await prepareFigureStyleFile(app)}"
`
  }

  if (mark) {
    content += `\
import "${await prepareMarkStyleFile(app, lightmodeSelector, darkmodeSelector)}"
`
  }

  return app.writeTemp(
    'markdown-image/client.js',
    `\
${content}

export default {}
`,
  )
}
