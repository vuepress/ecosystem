import { getRealPath } from '@vuepress/helper'
import type { App } from 'vuepress'
import { getTheme } from './getTheme.js'
import type { PrismjsPluginOptions } from './options.js'

const { url } = import.meta

export const prepareConfigFile = (
  app: App,
  {
    theme,
    themes,
    lineNumbers = true,
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
    `import "${getRealPath('@vuepress/highlighter-helper/styles/base.css', url)}"`,
  ]

  const setups: string[] = []

  if (light === dark) {
    imports.push(
      `import "${getRealPath(`@vuepress/plugin-prismjs/styles/${light}.css`, url)}"`,
    )
  } else {
    imports.push(
      `import "${getRealPath(`@vuepress/plugin-prismjs/styles/${light}.light.css`, url)}"`,
      `import "${getRealPath(`@vuepress/plugin-prismjs/styles/${dark}.dark.css`, url)}"`,
    )
  }

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

  imports.push(
    `import "${getRealPath('@vuepress/highlighter-helper/styles/collapsed-lines.css', url)}"`,
    `import { setupCollapsedLines } from "${getRealPath('@vuepress/highlighter-helper/composables/collapsedLines.js', url)}"`,
  )
  setups.push('setupCollapsedLines()')

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
