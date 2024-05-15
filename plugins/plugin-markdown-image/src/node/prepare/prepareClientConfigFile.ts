import { createRequire } from 'node:module'
import type { App } from 'vuepress'
import type { MarkdownImagePluginOptions } from '../options.js'
import { PLUGIN_NAME } from '../utils.js'
import { prepareMarkStyleFile } from './prepareMarkStyleFile.js'

const require = createRequire(import.meta.url)

export const prepareClientConfigFile = async (
  app: App,
  {
    lightmodeSelector = 'html:not(.dark)',
    darkmodeSelector = 'html.dark',
    figure,
    mark,
  }: MarkdownImagePluginOptions,
): Promise<string> => {
  let content = ''

  if (figure) {
    content += `\
import "${require.resolve(`${PLUGIN_NAME}/styles/figure.css`)}"
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
