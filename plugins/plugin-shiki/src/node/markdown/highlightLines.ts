// Modified from https://github.com/egoist/markdown-it-highlight-lines
// Now this plugin is only used to normalize line attrs.
// The else part of line highlights logic is in '../highlight.ts'.

import type { Markdown } from 'vuepress/markdown'

const HIGHLIGHT_LINES_REGEXP = /{([\d,-]+)}/

export const highlightLinesPlugin = (md: Markdown): void => {
  const originalFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]

    // due to use of markdown-it-attrs, the {0} syntax would have been
    // converted to attrs on the token
    const attr = token.attrs?.[0]

    let lines: string | null = null

    // markdown-it-attrs maybe disabled
    if (!attr) {
      const rawInfo = token.info
      const result = rawInfo?.match(HIGHLIGHT_LINES_REGEXP)

      if (!result) {
        return originalFence(...args)
      }

      // ensure the next plugin get the correct lang
      token.info = rawInfo.replace(HIGHLIGHT_LINES_REGEXP, '').trim()

      lines = result[1]
    }

    if (!lines) {
      lines = attr![0]

      if (!lines || !/[\d,-]+/.test(lines)) {
        return originalFence(...args)
      }
    }

    token.info += ' ' + lines
    return originalFence(...args)
  }
}
