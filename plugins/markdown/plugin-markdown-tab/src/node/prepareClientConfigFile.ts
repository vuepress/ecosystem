import type { App } from 'vuepress'
import { ensureEndingSlash } from 'vuepress/shared'
import { path } from 'vuepress/utils'

import type { MarkdownTabPluginOptions } from './options.js'

const __dirname = import.meta.dirname

const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, '../client'))

export const prepareClientConfigFile = (
  app: App,
  { codeTabs, tabs }: MarkdownTabPluginOptions,
): Promise<string> => {
  const imports = new Set<string>()
  const enhances = new Set<string>()

  if (codeTabs) {
    imports.add(
      `import { VPCodeTabs } from "${CLIENT_FOLDER}components/VPCodeTabs.js";`,
    )
    enhances.add(`app.component("VPCodeTabs", VPCodeTabs);`)
  }

  if (tabs) {
    imports.add(
      `import { VPTabs } from "${CLIENT_FOLDER}components/VPTabs.js";`,
    )
    enhances.add(`app.component("VPTabs", VPTabs);`)
  }

  return app.writeTemp(
    'markdown-tab/config.js',
    `\
${[...imports.values()].join('\n')}

export default {
  enhance: ({ app }) => {
${Array.from(enhances.values(), (line) => `    ${line}`).join('\n')}
  },
};
`,
  )
}
