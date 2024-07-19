import { getRealPath } from '@vuepress/helper'
import type { App } from 'vuepress'
import { getTheme } from './getTheme.js'
import type { PrismjsPluginOptions } from './options.js'

const { url } = import.meta

export const prepareConfigFile = (
  app: App,
  options: PrismjsPluginOptions,
): Promise<string> => {
  const { light, dark } = getTheme(options)

  const imports: string[] = [
    `import "${getRealPath('@vuepress/highlighter-helper/styles/base.css', url)}"`,
  ]

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

  return app.writeTemp('prismjs/config.js', imports.join('\n'))
}
