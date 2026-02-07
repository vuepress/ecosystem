// Modified from https://github.com/egoist/markdown-it-highlight-lines
// Now this plugin is only used to normalize line attrs.
// The else part of line highlights logic is in './highlight.ts'.

import type { Markdown } from 'vuepress/markdown'

const HIGHLIGHT_LINES_REGEXP = /{([\d,-]+?)}/

export const highlightLinePlugin = (md: Markdown): void => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]

    // due to use of markdown-it-attrs, the {0} syntax would have been
    // converted to attrs on the token
    const attr = token.attrs?.[0]

    let lines: string | null = null

    if (!attr) {
      // markdown-it-attrs maybe disabled
      const rawInfo = token.info

      if (!rawInfo || !HIGHLIGHT_LINES_REGEXP.test(rawInfo)) {
        return fence(...args)
      }

      const langName = rawInfo.replace(HIGHLIGHT_LINES_REGEXP, '').trim()

      // ensure the next plugin get the correct lang
      token.info = langName

      ;[, lines] = HIGHLIGHT_LINES_REGEXP.exec(rawInfo)!
    }

    if (!lines) {
      ;[lines] = attr!

      if (!lines || !/[\d,-]+/.test(lines)) {
        return fence(...args)
      }
    }

    token.info += ` ${lines}`
    return fence(...args)
  }
}
