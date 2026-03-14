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
export const useRevealJs = () => Promise.all(
  __VUEPRESS_SSR__
    ? []
    : [
        import(/* webpackChunkName: "reveal" */ "${getModulePath(
          'reveal.js',
          import.meta,
        )}").then(({ default: RevealJs }) => RevealJs),
        import(/* webpackChunkName: "reveal" */ "${getModulePath(
          'reveal.js/plugin/markdown',
          import.meta,
        )}").then(({ default: plugin }) => plugin),
      ${revealPlugins
        .map(
          (plugin) =>
            `  import(/* webpackChunkName: "reveal" */ "${getModulePath(
              `reveal.js/plugin/${plugin}`,
              import.meta,
            )}").then(({ default: plugin }) => plugin)`,
        )
        .join(',\n')}
      ]
  );
`,
  )
}
