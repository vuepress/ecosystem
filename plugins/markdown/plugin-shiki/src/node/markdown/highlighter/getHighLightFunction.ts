import { transformerCompactLineOptions } from '@shikijs/transformers'
import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ShikiTransformer,
} from 'shiki'
import {
  getTransformers,
  whitespaceTransformer,
} from '../../transformers/getTransformers.js'
import type { ShikiHighlightOptions } from '../../types.js'
import { attrsToLines } from '../../utils.js'
import type { MarkdownFilePathGetter } from './createMarkdownFilePathGetter.js'
import type { ShikiLoadLang } from './createShikiHighlighter.js'
import { getLanguage } from './getLanguage.js'
import { handleMustache } from './handleMustache.js'

type MarkdownItHighlight = (
  content: string,
  language: string,
  attrs: string,
) => string

/**
 * Get highlight function for markdown-it
 *
 * 获取 markdown-it 的高亮函数
 *
 * @param highlighter - Shiki highlighter instance / Shiki 高亮器实例
 * @param options - Highlight options / 高亮选项
 * @param extraTransformers - Extra transformers / 额外转换器
 * @param loadLang - Language loader function / 语言加载函数
 * @param markdownFilePathGetter - Markdown file path getter / Markdown 文件路径获取器
 *
 * @returns Highlight function for markdown-it / markdown-it 的高亮函数
 */
export const getHighLightFunction = (
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>,
  options: ShikiHighlightOptions,
  extraTransformers: ShikiTransformer[] | undefined,
  loadLang: ShikiLoadLang,
  markdownFilePathGetter: MarkdownFilePathGetter,
): MarkdownItHighlight => {
  const transformers = getTransformers(options)

  return (content, language, attrs) =>
    handleMustache(content, (str) =>
      highlighter.codeToHtml(str, {
        lang: getLanguage(language, options, loadLang, markdownFilePathGetter),
        meta: {
          /**
           * Custom `transformers` passed by users may require `attrs`.
           * e.g. [transformerNotationWordHighlight](https://shiki.style/packages/transformers#transformernotationwordhighlight)
           */
          __raw: attrs,
        },
        transformers: [
          ...transformers,
          ...((options.highlightLines ?? true)
            ? [transformerCompactLineOptions(attrsToLines(attrs))]
            : []),
          ...(options.whitespace
            ? whitespaceTransformer(attrs, options.whitespace)
            : []),
          ...(extraTransformers ?? []),
          ...(options.transformers ?? []),
        ],
        ...('themes' in options
          ? {
              themes: options.themes,
              defaultColor: false,
            }
          : { theme: options.theme ?? 'nord' }),
      }),
    )
}
