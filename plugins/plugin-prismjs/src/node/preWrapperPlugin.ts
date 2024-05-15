import type { Markdown } from 'vuepress/markdown'
import type { PreWrapperOptions } from './types.js'
import { resolveAttr } from './utils/resolveAttr.js'
import {
  isHighlightLine,
  resolveHighlightLines,
} from './utils/resolveHighlightLines.js'
import { resolveLanguage } from './utils/resolveLanguage.js'
import { resolveLineNumbers } from './utils/resolveLineNumbers.js'
import { resolveVPre } from './utils/resolveVPre.js'

export function preWrapperPlugin(
  md: Markdown,
  {
    highlightLines = true,
    lineNumbers = true,
    vPre: { block: vPreBlock = true, inline: vPreInline = true } = {},
  }: PreWrapperOptions,
): void {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''

    const code = fence(tokens, idx, options, env, slf)

    // remove `<code>` attributes
    let result = code.replace(/<code[^]*?>/, '<code>')

    // resolve v-pre mark from token info
    const useVPre = resolveVPre(info) ?? vPreBlock
    if (useVPre) {
      result = `<pre v-pre${result.slice('<pre'.length)}`
    }
    // code fences always have an ending `\n`, so we should trim the last line
    const lines = result
      .slice(result.indexOf('<code>'), result.indexOf('</code>'))
      .split('\n')
      .slice(0, -1)

    // resolve highlight line ranges from token info
    const highlightLinesRanges = highlightLines
      ? resolveHighlightLines(info)
      : null
    // generate highlight lines
    if (highlightLinesRanges) {
      const highlightLinesCode = lines
        .map((_, index) => {
          if (isHighlightLine(index + 1, highlightLinesRanges)) {
            return '<div class="highlight-line">&nbsp;</div>'
          }
          return '<br>'
        })
        .join('')

      result = `${result}<div class="highlight-lines">${highlightLinesCode}</div>`
    }

    // resolve line-numbers mark from token info
    const useLineNumbers =
      resolveLineNumbers(info) ??
      (typeof lineNumbers === 'number'
        ? lines.length >= lineNumbers
        : lineNumbers)
    // generate line numbers
    if (useLineNumbers) {
      // generate line numbers code
      const lineNumbersCode = lines
        .map(() => `<div class="line-number"></div>`)
        .join('')

      result = `${result}<div class="line-numbers" aria-hidden="true">${lineNumbersCode}</div>`
    }

    // resolve language from token info
    const language = resolveLanguage(info)
    // resolve title from token info
    const title = resolveAttr(info, 'title') ?? language.ext
    const languageClass = `${options.langPrefix}${language.name}`

    result = `<div class="${languageClass}${
      useLineNumbers ? ' line-numbers-mode' : ''
    }" data-ext="${language.ext}" data-title="${title}">${result}</div>`

    return result
  }

  if (vPreInline) {
    const rawInlineCodeRule = md.renderer.rules.code_inline!
    md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
      const result = rawInlineCodeRule(tokens, idx, options, env, slf)
      return `<code v-pre${result.slice('<code'.length)}`
    }
  }
}
