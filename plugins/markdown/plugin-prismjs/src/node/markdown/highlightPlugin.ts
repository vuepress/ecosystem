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
   * 是否启用行高亮
   *
   * @default true
   */
  highlightLines?: boolean

  /**
   * Enable notation diff
   *
   * 是否启用标记差异
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationdiff
   */
  notationDiff?: boolean

  /**
   * Enable notation focus
   *
   * 是否启用标记聚焦
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationfocus
   */
  notationFocus?: boolean

  /**
   * Enable notation highlight
   *
   * 是否启用标记高亮
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationhighlight
   */
  notationHighlight?: boolean

  /**
   * Enable notation error level
   *
   * 是否启用标记错误级别
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationerrorlevel
   */
  notationErrorLevel?: boolean

  /**
   * Enable notation word highlight
   *
   * 是否启用标记词汇高亮
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationwordhighlight
   */
  notationWordHighlight?: boolean

  /**
   * Enable render whitespace
   * - true: enable whitespace, but not render any whitespace by default
   * - false: disable whitespace completely
   * - 'all': render all whitespace
   * - 'boundary': render leading and trailing whitespace of each line.
   * - 'trailing': render trailing whitespace of each line
   *
   * you are able to use `:whitespace` or `:no-whitespace` or `:whitespace=all|boundary|trailing` to set single code block
   *
   * 是否启用渲染空格
   * - true: 启用空格，但默认不渲染任何空格
   * - false: 完全禁用空格
   * - 'all': 渲染所有空格
   * - 'boundary': 渲染每行的前导和尾随空格
   * - 'trailing': 渲染每行的尾随空格
   *
   * 你可以使用 `:whitespace` 或 `:no-whitespace` 或 `:whitespace=all|boundary|trailing` 来设置单个代码块
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformerrenderwhitespace
   */
  whitespace?: WhitespacePosition | boolean
}

/**
 * Markdown-it plugin for prismjs highlighting
 *
 * 用于 prismjs 高亮的 markdown-it 插件
 *
 * @param md - Markdown instance / Markdown 实例
 * @param options - Plugin options / 插件选项
 * @example
 * ```ts
 * import { highlightPlugin } from '@vuepress/plugin-prismjs'
 * import MarkdownIt from 'markdown-it'
 *
 * const md = new MarkdownIt()
 * md.use(highlightPlugin, { highlightLines: true })
 * ```
 */
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

    const parser = getCodeParser(code, language.name)

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

    if (whitespacePosition) {
      metaWhitespace(parser, info, whitespacePosition)
    }

    parser.pre.classList.push(languageClass)

    return parser.stringify()
  }
}
