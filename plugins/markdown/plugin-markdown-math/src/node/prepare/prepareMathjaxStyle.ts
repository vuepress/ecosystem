import type { MathjaxInstance } from '@mdit/plugin-mathjax-slim'
import type { App } from 'vuepress/core'

// Prevent mathjax breaking mobile layout
const MATHJAX_STYLE_PATCH = `\
mjx-container {
  overflow: auto hidden;
}
`

export const prepareMathjaxStyle = async (
  app: App,
  mathjaxInstance: MathjaxInstance,
): Promise<void> => {
  await app.writeTemp(
    'markdown-math/mathjax.css',
    `${mathjaxInstance.outputStyle()}\n${MATHJAX_STYLE_PATCH}`,
  )
}
