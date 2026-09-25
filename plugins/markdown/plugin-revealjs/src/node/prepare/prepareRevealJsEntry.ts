import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import type { RevealJsPlugin } from '../options.js'

const resolve = (module: string): string => getModulePath(module, import.meta)

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
        import(/* webpackChunkName: "reveal" */ "${resolve(
          'reveal.js',
        )}").then(({ default: RevealJs }) => RevealJs),
        import(/* webpackChunkName: "reveal" */ "${resolve(
          'reveal.js/plugin/markdown',
        )}").then(({ default: plugin }) => plugin),
      ${revealPlugins
        .map(
          (plugin) =>
            `  import(/* webpackChunkName: "reveal" */ "${resolve(
              `reveal.js/plugin/${plugin}`,
            )}").then(({ default: plugin }) => plugin)`,
        )
        .join(',\n')}
      ]
  );
`,
  )
}
