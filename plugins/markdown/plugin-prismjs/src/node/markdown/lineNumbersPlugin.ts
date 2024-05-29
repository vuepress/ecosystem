import type { Markdown } from 'vuepress/markdown'
import type { LineNumbersOptions } from '../types.js'
import { resolveLineNumbers } from '../utils/index.js'

const LINE_NUMBERS_START_REGEXP = /:line-numbers=(\d+)\b/

export const lineNumbersPlugin = (
  md: Markdown,
  { lineNumbers = true }: LineNumbersOptions = {},
): void => {
  const rawFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    const rawCode = rawFence(...args)

    const code = rawCode.slice(
      rawCode.indexOf('<code>'),
      rawCode.indexOf('</code>'),
    )

    const lines = code.split('\n').slice(0, -1)

    // resolve line-numbers mark from token info
    const useLineNumbers =
      resolveLineNumbers(info) ??
      (typeof lineNumbers === 'number'
        ? lines.length >= lineNumbers
        : lineNumbers)

    if (!useLineNumbers) {
      return rawCode
    }

    const startNumbers =
      Number(info.match(LINE_NUMBERS_START_REGEXP)?.[1] ?? 1) - 1
    const lineNumbersStyle = `style="counter-reset:line-number ${startNumbers}"`

    const lineNumbersCode = [...Array(lines.length)]
      .map(() => `<div class="line-number"></div>`)
      .join('')

    const lineNumbersWrapperCode = `<div class="line-numbers" aria-hidden="true" ${lineNumbersStyle}>${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace(/<\/div>$/, `${lineNumbersWrapperCode}</div>`)
      .replace(/"(language-[^"]*?)"/, '"$1 line-numbers-mode"')

    return finalCode
  }
}
