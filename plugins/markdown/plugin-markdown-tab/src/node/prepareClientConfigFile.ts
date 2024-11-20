import type { App } from 'vuepress'
import { ensureEndingSlash } from 'vuepress/shared'
import { getDirname, path } from 'vuepress/utils'
import type { MarkdownTabPluginOptions } from './options.js'

const { url } = import.meta

const __dirname = getDirname(url)

const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, '../client'))

export const prepareClientConfigFile = (
  app: App,
  { codeTabs, tabs }: MarkdownTabPluginOptions,
): Promise<string> => {
  const imports = new Set<string>()
  const enhances = new Set<string>()

  if (codeTabs) {
    imports.add(
      `import { CodeTabs } from "${CLIENT_FOLDER}components/CodeTabs.js";`,
    )
    enhances.add(`app.component("CodeTabs", CodeTabs);`)
  }

  if (tabs) {
    imports.add(`import { Tabs } from "${CLIENT_FOLDER}components/Tabs.js";`)
    enhances.add(`app.component("Tabs", Tabs);`)
  }

  return app.writeTemp(
    'markdown-tab/config.js',
    `\
${Array.from(imports.values()).join('\n')}
import "${CLIENT_FOLDER}styles/vars.css";

export default {
  enhance: ({ app }) => {
${Array.from(enhances.values())
  .map((line) => `    ${line}`)
  .join('\n')}
  },
};
`,
  )
}
