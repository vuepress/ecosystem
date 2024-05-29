import type { Markdown } from 'vuepress/markdown'
import {
  getCodeParser,
  getHighlightLinesRange,
  highlightCodeLines,
  notationDiff,
  notationErrorLevel,
  notationFocus,
  notationHighlight,
} from '../parser/index.js'
import type { HighlightOptions } from '../types.js'
import { resolveLanguage } from '../utils/index.js'

export const highlightPlugin = (
  md: Markdown,
  {
    highlightLines = true,
    notationDiff: enabledDiff,
    notationErrorLevel: enabledErrorLevel,
    notationFocus: enabledFocus,
    notationHighlight: enabledHighlight,
  }: HighlightOptions = {},
): void => {
  const rawFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, { langPrefix }] = args
    const token = tokens[idx]

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    // resolve language from token info
    const language = resolveLanguage(info)
    const languageClass = `${langPrefix}${language.name}`

    const code = rawFence(...args)
      // remove the default `language-${ext}` class
      .replace(/<code[^]*?>/, '<code>')

    const parser = getCodeParser(code)

    if (highlightLines) {
      highlightCodeLines(parser, getHighlightLinesRange(info))
    }
    if (enabledDiff) {
      notationDiff(parser)
    }
    if (enabledErrorLevel) {
      notationErrorLevel(parser)
    }
    if (enabledFocus) {
      notationFocus(parser)
    }
    if (enabledHighlight) {
      notationHighlight(parser)
    }

    /**
     * Add the `prismjs` class name to distinguish the highlight library used for the current code block.
     */
    parser.pre.classList.push('prismjs')

    parser.pre.classList.push(languageClass)

    return parser.stringify()
  }
}
