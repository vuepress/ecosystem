import type { WhitespacePosition } from '@vuepress/highlighter-helper'
import type { Markdown } from 'vuepress/markdown'
import {
  getCodeParser,
  getHighlightLinesRange,
  highlightCodeLines,
  metaWhitespace,
  metaWordHighlight,
  notationDiff,
  notationErrorLevel,
  notationFocus,
  notationHighlight,
  notationWordHighlight,
} from '../parser/index.js'
import { resolveLanguage } from '../utils/index.js'

export interface MarkdownItPrismjsHighlightOptions {
  /**
   * Enable highlight lines or not
   *
   * @default true
   */
  highlightLines?: boolean

  /**
   * Enable notation diff
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationdiff
   */
  notationDiff?: boolean

  /**
   * Enable notation focus
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationfocus
   */
  notationFocus?: boolean

  /**
   * Enable notation highlight
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationhighlight
   */
  notationHighlight?: boolean

  /**
   * Enable notation error level
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationerrorlevel
   */
  notationErrorLevel?: boolean

  /**
   * Enable notation word highlight
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationwordhighlight
   */
  notationWordHighlight?: boolean

  /**
   * Enable render whitespace
   * - true: enable render whitespace, same of `all`
   * - false: disable render whitespace
   * - 'all': render all whitespace
   * - 'boundary': render leading and trailing whitespace of each line.
   * - 'trailing': render trailing whitespace of each line
   *
   * you are able to use `:whitespace` or `:no-whitespace` or `:whitespace=position` to set single code block
   *
   * position: 'all' | 'boundary' | 'trailing'
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformerrenderwhitespace
   */
  whitespace?: WhitespacePosition | boolean
}

export const highlightPlugin = (
  md: Markdown,
  {
    highlightLines = true,
    notationDiff: enabledDiff,
    notationErrorLevel: enabledErrorLevel,
    notationFocus: enabledFocus,
    notationHighlight: enabledHighlight,
    notationWordHighlight: enabledWordHighlight,
    whitespace: whitespacePosition = false,
  }: MarkdownItPrismjsHighlightOptions = {},
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

    metaWhitespace(parser, info, whitespacePosition)

    parser.pre.classList.push(languageClass)

    return parser.stringify()
  }
}
