import type { Markdown } from 'vuepress/markdown'
import type { MarkdownItCollapsedLinesOptions } from './options.js'
import { resolveCollapsedLines } from './resolveCollapsedLine.js'

/**
 * Add collapsed lines functionality to code blocks in markdown-it
 *
 * 为 markdown-it 中的代码块添加折叠行功能
 *
 * @param md - The markdown-it instance / markdown-it 实例
 * @param options - Plugin options / 插件选项
 *
 * @example
 * ```ts
 * import { collapsedLines } from '@vuepress/highlighter-helper'
 *
 * md.use(collapsedLines, {
 *   collapsedLines: 15,
 *   removeLastLine: false
 * })
 * ```
 */
export const collapsedLines = (
  md: Markdown,
  {
    collapsedLines: collapsedLinesOptions = 'disable',
    removeLastLine,
  }: MarkdownItCollapsedLinesOptions = {},
): void => {
  if (collapsedLinesOptions === 'disable') return

  const rawFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, index] = args
    const token = tokens[index]
    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    const code = rawFence(...args)

    // resolve collapsed-lines mark from token info
    const collapsedLinesInfo =
      resolveCollapsedLines(info) ?? collapsedLinesOptions

    if (collapsedLinesInfo === false) {
      return code
    }

    const lines =
      code
        .slice(code.indexOf('<code class="language-'), code.indexOf('</code>'))
        .split('\n').length - (removeLastLine ? 1 : 0)
    const startLines =
      typeof collapsedLinesInfo === 'number' ? collapsedLinesInfo : 15

    if (lines < startLines) {
      return code
    }

    const collapsedLinesCode = `<div class="collapsed-lines"></div>`
    const styles = `--vp-collapsed-lines:${startLines};`

    const finalCode = code
      .replace(/<\/div>$/, `${collapsedLinesCode}</div>`)
      .replace(/"(language-[^"]*?)"/, '"$1 has-collapsed-lines collapsed"')
      .replace(/^<div[^>]*>/, (match) => {
        if (!match.includes('style=')) {
          return `${match.slice(0, -1)} style="${styles}">`
        }
        return match.replace(/(style=")/, `$1${styles}`)
      })

    return finalCode
  }
}
