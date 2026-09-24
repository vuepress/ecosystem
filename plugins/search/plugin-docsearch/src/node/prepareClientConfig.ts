import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'

import { PLUGIN_NAME } from './utils.js'

const resolve = (module: string): string => getModulePath(module, import.meta)

export const prepareClientConfig = (
  app: App,
  injectStyles: boolean,
): Promise<string> =>
  app.writeTemp(
    'docsearch/config.js',
    `
import { DocSearch, injectDocSearchConfig } from "${resolve(`${PLUGIN_NAME}/client`)}"
${
  injectStyles
    ? `\
import '${resolve('@docsearch/css')}'
import '${resolve(`${PLUGIN_NAME}/styles/docsearch.css`)}'
import '${resolve(`${PLUGIN_NAME}/styles/vars.css`)}'
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
