import { getRealPath } from '@vuepress/helper'
import type { App } from 'vuepress'
import type { ShikiPluginOptions } from './options.js'
import { PLUGIN_NAME } from './utils.js'

const { url } = import.meta

export const prepareConfigFile = (
  app: App,
  {
    lineNumbers = true,
    notationDiff,
    notationErrorLevel,
    notationFocus,
    notationHighlight,
    notationWordHighlight,
    whitespace,
  }: ShikiPluginOptions,
): Promise<string> => {
  const imports: string[] = [
    `import "${getRealPath('@vuepress/highlighter-helper/styles/base.css', url)}"`,
    `import "${getRealPath(`${PLUGIN_NAME}/styles/shiki.css`, import.meta.url)}"`,
  ]

  if (lineNumbers) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/line-numbers.css', url)}"`,
    )
  }

  if (notationDiff) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/notation-diff.css', url)}"`,
    )
  }

  if (notationErrorLevel) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/notation-error-level.css', url)}"`,
    )
  }

  if (notationFocus) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/notation-focus.css', url)}"`,
    )
  }

  if (notationHighlight) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/notation-highlight.css', url)}"`,
    )
  }

  if (notationWordHighlight) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/notation-word-highlight.css', url)}"`,
    )
  }

  if (whitespace) {
    imports.push(
      `import "${getRealPath('@vuepress/highlighter-helper/styles/whitespace.css', url)}"`,
    )
  }

  return app.writeTemp('shiki/config.js', imports.join('\n'))
}
