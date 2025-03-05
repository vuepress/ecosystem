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
      `import { Contributors } from "${CLIENT_FOLDER}components/Contributors.js";`,
    )
    enhances.add(`app.component("GitContributors", Contributors);`)
  }

  if (changelog) {
    imports.add(
      `import { Changelog } from "${CLIENT_FOLDER}components/Changelog.js";`,
    )
    enhances.add(`app.component("GitChangelog", Changelog);`)
  }

  return app.writeTemp(
    'git/config.js',
    `\
${Array.from(imports.values()).join('\n')}

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
