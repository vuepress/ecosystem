import type { Markdown } from 'vuepress/markdown'
import {
  highlightLines,
  notationDiff,
  notationErrorLevel,
  notationFocus,
  notationHighlight,
  parse,
  resolveHighlightLines,
} from '../parser/index.js'
import type { PreWrapperOptions } from '../types.js'
import { resolveLanguage } from '../utils/index.js'

export const highlightPlugin = (
  md: Markdown,
  {
    highlightLines: enabledHighlightLines = true,
    notationDiff: enabledDiff,
    notationErrorLevel: enabledErrorLevel,
    notationFocus: enabledFocus,
    notationHighlight: enabledHighlight,
  }: PreWrapperOptions = {},
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

    const parser = parse(code)

    if (enabledHighlightLines) {
      highlightLines(parser, resolveHighlightLines(info))
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

    parser.pre.class.push(languageClass)

    return parser.stringify()
  }
}
