import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'

import type { ShikiPluginOptions } from './options.js'
import type { CodeThemeColors } from './themeColors.js'
import { getCodeThemeColorsCss } from './themeColors.js'
import { PLUGIN_NAME } from './utils.js'

const resolve = (module: string): string => getModulePath(module, import.meta)

// oxlint-disable-next-line max-lines-per-function, complexity, max-statements
export const prepareClientConfigFile = async (
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
  colors: { dark: CodeThemeColors | null; light: CodeThemeColors | null },
): Promise<string> => {
  const imports: string[] = [
    `import "${resolve('@vuepress/highlighter-helper/styles/base.css')}"`,
    `import "${resolve(`${PLUGIN_NAME}/shiki.css`)}"`,
  ]

  // The base colors of the code blocks are resolved from the themes of the
  // highlighter, so they are written to the temp folder instead of being part
  // of the styles of the plugin. The import comes after `shiki.css`, which
  // holds the fallback colors.
  const css = getCodeThemeColorsCss(colors)

  if (css) {
    await app.writeTemp('shiki/theme-colors.css', css)
    imports.push(`import "@temp/shiki/theme-colors.css"`)
  }

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
