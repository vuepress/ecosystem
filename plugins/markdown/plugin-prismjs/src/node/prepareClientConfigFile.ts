import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'
import { getTheme } from './getTheme.js'
import type { PrismjsPluginOptions } from './options.js'

export const prepareClientConfigFile = (
  app: App,
  {
    theme,
    themes,
    lineNumbers = true,
    highlightLines = true,
    collapsedLines = 'disable',
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
    `import "${getModulePath('@vuepress/highlighter-helper/styles/base.css', import.meta)}"`,
  ]

  const setups: string[] = []

  if (light === dark) {
    imports.push(
      `import "${getModulePath(`@vuepress/plugin-prismjs/styles/${light}.css`, import.meta)}"`,
    )
  } else {
    imports.push(
      `import "${getModulePath(`@vuepress/plugin-prismjs/styles/${light}.light.css`, import.meta)}"`,
      `import "${getModulePath(`@vuepress/plugin-prismjs/styles/${dark}.dark.css`, import.meta)}"`,
    )
  }

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
