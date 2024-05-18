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
  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, { langPrefix }] = args
    const token = tokens[idx]

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    // resolve language from token info
    const language = resolveLanguage(info)
    const languageClass = `${langPrefix}${language.name}`

    const code = fence(...args).replace(/<code[^]*?>/, '<code>')

    const parser = parse(code)

    enabledHighlightLines && highlightLines(parser, resolveHighlightLines(info))
    enabledDiff && notationDiff(parser)
    enabledErrorLevel && notationErrorLevel(parser)
    enabledFocus && notationFocus(parser)
    enabledHighlight && notationHighlight(parser)

    parser.pre.class.push(languageClass)

    return parser.stringify()
  }
}