import type { Markdown } from 'vuepress/markdown'
import type { MarkdownItCollapsedLinesOptions } from './options.js'
import { resolveCollapsedLines } from './resolveCollapsedLine.js'

export const collapsedLines = (
  md: Markdown,
  {
    collapsedLines: collapsedLinesOptions = false,
  }: MarkdownItCollapsedLinesOptions = {},
): void => {
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

    const startLines =
      typeof collapsedLinesInfo === 'number' ? collapsedLinesInfo : 15
    const collapsedLinesCode = `<div class="collapsed-lines" aria-hidden="true"></div>`

    const finalCode = code
      .replace(/<\/div>$/, `${collapsedLinesCode}</div>`)
      .replace(/"(language-[^"]*?)"/, '"$1 has-collapsed-lines collapsed"')
      .replace(/^<div[^>]*>/, (match) => {
        const vars = `--vp-collapsed-lines:${startLines};`
        if (!match.includes('style=')) {
          return `${match.slice(0, -1)} style="${vars}">`
        }
        return match.replace(/(style=")/, `$1${vars}`)
      })

    return finalCode
  }
}
