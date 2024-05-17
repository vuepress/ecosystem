// markdown-it plugin for generating line numbers.
// It depends on preWrapper plugin.

import type { Markdown } from 'vuepress/markdown'

const LINE_NUMBERS_REGEXP = /:line-numbers\b/
const NO_LINE_NUMBERS_REGEXP = /:no-line-numbers\b/

export const lineNumberPlugin = (
  md: Markdown,
  enable: boolean | number = true,
): void => {
  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)

    const [tokens, idx] = args
    const info = tokens[idx].info
    const enableLineNumbers = LINE_NUMBERS_REGEXP.test(info)
    const disableLineNumbers = NO_LINE_NUMBERS_REGEXP.test(info)

    if ((!enable && !enableLineNumbers) || (enable && disableLineNumbers)) {
      return rawCode
    }

    const code = rawCode.slice(
      rawCode.indexOf('<code>'),
      rawCode.indexOf('</code>'),
    )

    const lines = code.split('\n')

    if (
      typeof enable === 'number' &&
      lines.length < enable &&
      !enableLineNumbers
    ) {
      return rawCode
    }

    const lineNumbersCode = [...Array(lines.length)]
      .map(() => `<div class="line-number"></div>`)
      .join('')

    const lineNumbersWrapperCode = `<div class="line-numbers" aria-hidden="true">${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace(/<\/div>$/, `${lineNumbersWrapperCode}</div>`)
      .replace(/"(language-[^"]*?)"/, '"$1 line-numbers-mode"')

    return finalCode
  }
}
