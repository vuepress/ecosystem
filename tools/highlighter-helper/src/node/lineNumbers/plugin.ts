import type { Markdown } from 'vuepress/markdown'
import type { MarkdownItLineNumbersOptions } from './options.js'
import { resolveLineNumbers } from './resolveLineNumbers.js'

/**
 * Add line numbers to code blocks in markdown-it
 *
 * 为 markdown-it 中的代码块添加行号
 *
 * @param md - The markdown-it instance / markdown-it 实例
 * @param options - Plugin options / 插件选项
 *
 * @example
 * ```ts
 * import { lineNumbers } from '@vuepress/highlighter-helper'
 *
 * md.use(lineNumbers, {
 *   lineNumbers: true,
 *   removeLastLine: false
 * })
 * ```
 */
export const lineNumbers = (
  md: Markdown,
  {
    lineNumbers: lineNumberOptions = true,
    removeLastLine,
    resolveLineNumbers: customResolveLineNumbers,
  }: MarkdownItLineNumbersOptions = {},
): void => {
  const rawFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, index] = args
    const token = tokens[index]
    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    const rawCode = rawFence(...args)

    const code = rawCode.slice(
      rawCode.indexOf('<code class="language-'),
      rawCode.indexOf('</code>'),
    )

    const lines = code.split('\n')

    if (removeLastLine) {
      lines.pop()
    }

    // resolve line-numbers mark from token info
    const lineNumbersInfo =
      customResolveLineNumbers?.(info) ??
      resolveLineNumbers(info) ??
      (typeof lineNumberOptions === 'number'
        ? lines.length >= lineNumberOptions
        : lineNumberOptions)

    if (lineNumbersInfo === false) {
      return rawCode
    }

    const startNumbers =
      typeof lineNumbersInfo === 'number' ? lineNumbersInfo - 1 : 0
    const lineNumbersStyle = `style="counter-reset:line-number ${startNumbers}"`

    const lineNumbersCode = Array(lines.length)
      .fill('<div class="line-number"></div>')
      .join('')

    const lineNumbersWrapperCode = `<div class="line-numbers" aria-hidden="true" ${lineNumbersStyle}>${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace(/<\/div>$/, `${lineNumbersWrapperCode}</div>`)
      .replace(/"(language-[^"]*?)"/, '"$1 line-numbers-mode"')

    return finalCode
  }
}
