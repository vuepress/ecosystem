import type { App } from 'vuepress'
import type { MarkdownImagePluginOptions } from '../options.js'
import { prepareFigureStyleFile } from './prepareFigureStyleFile.js'
import { prepareMarkStyleFile } from './prepareMarkStyleFile.js'

export const prepareClientConfigFile = async (
  app: App,
  {
    contentSelector = '.theme-default-content',
    lightmodeSelector = 'html:not(.dark)',
    darkmodeSelector = 'html.dark',
    figure,
    mark,
  }: MarkdownImagePluginOptions,
): Promise<string> => {
  let content = ''

  if (figure) {
    content += `\
import "${await prepareFigureStyleFile(app, contentSelector)}"
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
