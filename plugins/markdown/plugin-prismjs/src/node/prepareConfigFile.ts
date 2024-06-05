import { getRealPath } from '@vuepress/helper'
import type { App } from 'vuepress'
import type { PrismjsPluginOptions } from './options.js'

const { url } = import.meta

export const prepareConfigFile = (
  app: App,
  options: PrismjsPluginOptions,
): Promise<string> => {
  const imports: string[] = [
    `import "${getRealPath('@vuepress/highlighter-helper/styles/base.css', url)}"`,
    `import "${getRealPath('@vuepress/plugin-prismjs/client/styles/prismjs.css', import.meta.url)}"`,
  ]

  if (options.notationDiff) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/notation-diff.css', url)}"`,
    )
  }

  if (options.notationErrorLevel) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/notation-error-level.css', url)}"`,
    )
  }

  if (options.notationFocus) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/notation-focus.css', url)}"`,
    )
  }

  if (options.notationHighlight) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/notation-highlight.css', url)}"`,
    )
  }

  return app.writeTemp('shiki/config.js', imports.join('\n'))
}
