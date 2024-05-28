// markdown-it plugin for generating line numbers.
// It depends on preWrapper plugin.

import type { Markdown } from 'vuepress/markdown'
import type { LineNumberOptions } from '../types.js'

const LINE_NUMBERS_REGEXP = /:line-numbers\b/
const NO_LINE_NUMBERS_REGEXP = /:no-line-numbers\b/
const LINE_NUMBERS_START_REGEXP = /:line-numbers=(\d+)\b/

export const lineNumberPlugin = (
  md: Markdown,
  { lineNumbers = true }: LineNumberOptions = {},
): void => {
  const rawFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const rawCode = rawFence(...args)

    const [tokens, idx] = args
    const info = tokens[idx].info
    const enableLineNumbers = LINE_NUMBERS_REGEXP.test(info)
    const disableLineNumbers = NO_LINE_NUMBERS_REGEXP.test(info)

    if (
      (!lineNumbers && !enableLineNumbers) ||
      (lineNumbers && disableLineNumbers)
    ) {
      return rawCode
    }

    const code = rawCode.slice(
      rawCode.indexOf('<code>'),
      rawCode.indexOf('</code>'),
    )

    const lines = code.split('\n')

    if (
      typeof lineNumbers === 'number' &&
      lines.length < lineNumbers &&
      !enableLineNumbers
    ) {
      return rawCode
    }

    const startNumbers = Number(info.match(LINE_NUMBERS_START_REGEXP)?.[1] ?? 1)

    /**
     * Originally intended to use `counter-reset: line-number attr(data-start number)`,
     * but due to its poor compatibility, the current approach was chosen.
     */
    const lineNumbersCode = [...Array(lines.length)]
      .map((_, i) => `<div class="line-number">${startNumbers + i}</div>`)
      .join('')

    const lineNumbersWrapperCode = `<div class="line-numbers" aria-hidden="true">${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace(/<\/div>$/, `${lineNumbersWrapperCode}</div>`)
      .replace(/"(language-[^"]*?)"/, '"$1 line-numbers-mode"')

    return finalCode
  }
}
