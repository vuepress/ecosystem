import type { Markdown } from 'vuepress/markdown'
import {
  getCodeParser,
  getHighlightLinesRange,
  highlightCodeLines,
  metaWordHighlight,
  notationDiff,
  notationErrorLevel,
  notationFocus,
  notationHighlight,
  notationWordHighlight,
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
    notationWordHighLight: enabledWordHighlight,
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

    if (enabledWordHighlight) {
      notationWordHighlight(parser)
      metaWordHighlight(parser, info)
    }

    parser.pre.classList.push(languageClass)

    return parser.stringify()
  }
}
