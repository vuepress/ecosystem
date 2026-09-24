import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'

import type { ShikiPluginOptions } from './options.js'
import { PLUGIN_NAME } from './utils.js'

const resolve = (module: string): string => getModulePath(module, import.meta)

// oxlint-disable-next-line max-lines-per-function, complexity, max-statements
export const prepareClientConfigFile = (
  app: App,
  {
    lineNumbers = true,
    highlightLines = true,
    collapsedLines = 'disable',
    codeBlockTitle = true,
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
    `import "${resolve('@vuepress/highlighter-helper/styles/base.css')}"`,
    `import "${resolve(`${PLUGIN_NAME}/shiki.css`)}"`,
  ]

  const enhances: string[] = []
  const setups: string[] = []

  if (lineNumbers !== 'disable') {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/line-numbers.css')}"`,
    )
  }

  if (highlightLines || notationHighlight) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-highlight.css')}"`,
    )
  }

  if (notationDiff) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-diff.css')}"`,
    )
  }

  if (notationErrorLevel) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-error-level.css')}"`,
    )
  }

  if (notationFocus) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-focus.css')}"`,
    )
  }

  if (notationHighlight) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-highlight.css')}"`,
    )
  }

  if (notationWordHighlight) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-word-highlight.css')}"`,
    )
  }

  if (whitespace) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/whitespace.css')}"`,
    )
  }

  if (collapsedLines !== 'disable') {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/collapsed-lines.css')}"`,
      `import { setupCollapsedLines } from "${resolve('@vuepress/highlighter-helper/client')}"`,
    )
    setups.push('setupCollapsedLines()')
  }

  if (codeBlockTitle) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/code-block-title.css')}"`,
    )
  }

  if (twoslash) {
    imports.push(
      `import { enhanceTwoslash } from "${resolve('@vuepress/shiki-twoslash/client')}"`,
      `import "${resolve('@vuepress/shiki-twoslash/twoslash.css')}"`,
    )
    enhances.push('enhanceTwoslash(app)')
  }

  let code = imports.join('\n')

  if (setups.length || enhances.length) {
    code += `
export default {
`

    if (enhances.length) {
      code += `\
  enhance({ app }) {
    ${enhances.join('\n    ')}
  },
`
    }

    if (setups.length) {
      code += `\
  setup() {
    ${setups.join('\n    ')}
  },
`
    }

    code += `\
}
`
  }

  return app.writeTemp('shiki/config.js', code)
}
