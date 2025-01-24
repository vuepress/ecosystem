import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'
import type { ShikiPluginOptions } from './options.js'
import { PLUGIN_NAME } from './utils.js'

export const prepareClientConfigFile = (
  app: App,
  {
    lineNumbers = true,
    highlightLines = true,
    collapsedLines = 'disable',
    notationDiff,
    notationErrorLevel,
    notationFocus,
    notationHighlight,
    notationWordHighlight,
    whitespace,
    twoslash,
  }: ShikiPluginOptions,
): Promise<string> => {
  const imports: string[] = [
    `import "${getModulePath('@vuepress/highlighter-helper/styles/base.css', import.meta)}"`,
    `import "${getModulePath(`${PLUGIN_NAME}/styles/shiki.css`, import.meta)}"`,
  ]

  const setups: string[] = []

  if (lineNumbers !== 'disable') {
    imports.push(
      `import "${getModulePath('@vuepress/highlighter-helper/styles/line-numbers.css', import.meta)}"`,
    )
  }

  if (highlightLines || notationHighlight) {
    imports.push(
      `import "${getModulePath('@vuepress/highlighter-helper/styles/notation-highlight.css', import.meta)}"`,
    )
  }

  if (notationDiff) {
    imports.push(
      `import "${getModulePath('@vuepress/highlighter-helper/styles/notation-diff.css', import.meta)}"`,
    )
  }

  if (notationErrorLevel) {
    imports.push(
      `import "${getModulePath('@vuepress/highlighter-helper/styles/notation-error-level.css', import.meta)}"`,
    )
  }

  if (notationFocus) {
    imports.push(
      `import "${getModulePath('@vuepress/highlighter-helper/styles/notation-focus.css', import.meta)}"`,
    )
  }

  if (notationHighlight) {
    imports.push(
      `import "${getModulePath('@vuepress/highlighter-helper/styles/notation-highlight.css', import.meta)}"`,
    )
  }

  if (notationWordHighlight) {
    imports.push(
      `import "${getModulePath('@vuepress/highlighter-helper/styles/notation-word-highlight.css', import.meta)}"`,
    )
  }

  if (whitespace) {
    imports.push(
      `import "${getModulePath('@vuepress/highlighter-helper/styles/whitespace.css', import.meta)}"`,
    )
  }

  if (collapsedLines !== 'disable') {
    imports.push(
      `import "${getModulePath('@vuepress/highlighter-helper/styles/collapsed-lines.css', import.meta)}"`,
      `import { setupCollapsedLines } from "${getModulePath('@vuepress/highlighter-helper/client', import.meta)}"`,
    )
    setups.push('setupCollapsedLines()')
  }

  if (twoslash) {
    imports.push(
      `import "${getModulePath('@shikijs/twoslash/style-rich.css', import.meta)}"`,
      `import "${getModulePath(`${PLUGIN_NAME}/styles/twoslash.css`, import.meta)}"`,
    )
  }

  let code = imports.join('\n')

  if (setups.length) {
    code += `\n
export default {
  setup() {
    ${setups.join('\n    ')}
  }
}\n`
  }

  return app.writeTemp('shiki/config.js', code)
}
