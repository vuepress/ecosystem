import type { App } from 'vuepress'
import { ensureEndingSlash } from 'vuepress/shared'
import { getDirname, path } from 'vuepress/utils'
import type { GitPluginOptions } from './options.js'

const { url } = import.meta

const __dirname = getDirname(url)

const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, '../client'))

export const prepareClientConfigFile = (
  app: App,
  { changelog, contributors }: GitPluginOptions,
): Promise<string> => {
  const imports = new Set<string>()
  const enhances = new Set<string>()

  if (contributors ?? true) {
    imports.add(
      `import { GitContributors } from "${CLIENT_FOLDER}components/GitContributors.js";`,
    )
    enhances.add(`app.component("GitContributors", GitContributors);`)
  }

  if (changelog) {
    imports.add(
      `import { GitChangelog } from "${CLIENT_FOLDER}components/GitChangelog.js";`,
    )
    enhances.add(`app.component("GitChangelog", GitChangelog);`)
  }

  return app.writeTemp(
    'git/config.js',
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
