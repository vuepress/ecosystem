import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import type { RevealJsPlugin } from '../options.js'

export const prepareRevealJsEntry = async (
  app: App,
  revealPlugins: RevealJsPlugin[],
): Promise<void> => {
  await app.writeTemp(
    'revealjs/index.js',
    `\
export const useRevealJs = () => [
  import(/* webpackChunkName: "reveal" */ "${getModulePath(
    'reveal.js/dist/reveal.esm.js',
    import.meta,
  )}"),
  import(/* webpackChunkName: "reveal" */ "${getModulePath(
    'reveal.js/plugin/markdown/markdown.esm.js',
    import.meta,
  )}"),
${revealPlugins
  .map(
    (plugin) =>
      `  import(/* webpackChunkName: "reveal" */ "${getModulePath(
        `reveal.js/plugin/${plugin}/${plugin}.esm.js`,
        import.meta,
      )}")`,
  )
  .join(',\n')}
];
`,
  )
}
