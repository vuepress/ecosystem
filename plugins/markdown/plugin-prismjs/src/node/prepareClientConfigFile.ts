import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'

import { getTheme } from './getTheme.js'
import type { PrismjsPluginOptions } from './options.js'

const resolve = (module: string): string => getModulePath(module, import.meta)

export const prepareClientConfigFile = (
  app: App,
  {
    theme,
    themes,
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
  }: PrismjsPluginOptions,
): Promise<string> => {
  const { light, dark } = getTheme({ theme, themes })

  const imports: string[] = [
    `import "${resolve('@vuepress/highlighter-helper/styles/base.css')}"`,
  ]

  const setups: string[] = []

  if (light === dark) {
    imports.push(
      `import "${resolve(`@vuepress/plugin-prismjs/styles/${light}.css`)}"`,
    )
  } else {
    imports.push(
      `import "${resolve(`@vuepress/plugin-prismjs/styles/${light}.light.css`)}"`,
      `import "${resolve(`@vuepress/plugin-prismjs/styles/${dark}.dark.css`)}"`,
    )
  }

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

  let code = imports.join('\n')

  if (setups.length) {
    code += `\n
export default {
  setup() {
    ${setups.join('\n    ')}
  }
}\n`
  }

  return app.writeTemp('prismjs/config.js', code)
}
