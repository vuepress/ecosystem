import type { MathjaxInstance } from '@mdit/plugin-mathjax-slim'
import type { App } from 'vuepress/core'

// 1. prevent mathjax breaking mobile layout
// 2. hide assistive mml
const MATHJAX_STYLE_PATCH = `\
mjx-container {
  overflow: auto hidden;
}

mjx-assistive-mml {
  display: none;
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
