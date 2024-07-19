import { getRealPath } from '@vuepress/helper'
import type { App } from 'vuepress'
import type { ShikiPluginOptions } from './options.js'
import { PLUGIN_NAME } from './utils.js'

const { url } = import.meta

export const prepareConfigFile = (
  app: App,
  options: ShikiPluginOptions,
): Promise<string> => {
  const imports: string[] = [
    `import "${getRealPath('@vuepress/highlighter-helper/styles/base.css', url)}"`,
    `import "${getRealPath(`${PLUGIN_NAME}/styles/shiki.css`, import.meta.url)}"`,
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

  if (options.notationWordHighlight) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/notation-word-highlight.css', url)}"`,
    )
  }

  if (options.whitespace) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/whitespace.css', url)}"`,
    )
  }

  return app.writeTemp('shiki/config.js', imports.join('\n'))
}
