import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'
import { PLUGIN_NAME } from './utils.js'

export const prepareClientConfig = (
  app: App,
  injectStyles: boolean,
): Promise<string> =>
  app.writeTemp(
    'docsearch/config.js',
    `
import { DocSearch, injectDocSearchConfig } from "${getModulePath(`${PLUGIN_NAME}/client`, import.meta)}"
${
  injectStyles
    ? `\
import '${getModulePath('@docsearch/css', import.meta)}'
import '${getModulePath(`${PLUGIN_NAME}/styles/docsearch.css`, import.meta)}'
import '${getModulePath(`${PLUGIN_NAME}/styles/vars.css`, import.meta)}'
`
    : ''
}\

export default {
  enhance({ app }) {
    injectDocSearchConfig(app)
    app.component('SearchBox', DocSearch)
  },
}
`,
  )
