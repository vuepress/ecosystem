import { transformerCompactLineOptions } from '@shikijs/transformers'
import type MarkdownIt from 'markdown-it'
import { getHighlighter } from 'shiki'
import type { App } from 'vuepress'
import { bundledLanguageNames } from '../../shiki.js'
import { getTransformers } from '../../transformers/getTransformers.js'
import type { ShikiHighlightOptions } from '../../types.js'
import { attrsToLines } from '../../utils.js'
import { createMarkdownFilePathGetter } from './createMarkdownFilePathGetter.js'
import { getLanguage } from './getLanguage.js'
import { handleMustache } from './handleMustache.js'

export const applyHighlighter = async (
  md: MarkdownIt,
  app: App,
  {
    langs = bundledLanguageNames,
    langAlias = {},
    defaultLang = 'plain',
    transformers: userTransformers = [],
    ...options
  }: ShikiHighlightOptions = {},
): Promise<void> => {
  const logLevel = options.logLevel ?? (app.env.isDebug ? 'debug' : 'warn')
  const getMarkdownFilePath =
    logLevel === 'debug' ? createMarkdownFilePathGetter(md) : null

  const highlighter = await getHighlighter({
    langs,
    langAlias,
    themes:
      'themes' in options
        ? Object.values(options.themes)
        : [options.theme ?? 'nord'],
  })

  await options.shikiSetup?.(highlighter)

  const transformers = getTransformers(options)
  const loadedLanguages = highlighter.getLoadedLanguages()

  md.options.highlight = (str, language, attrs) =>
    handleMustache(str, (str) =>
      highlighter.codeToHtml(str, {
        lang: getLanguage(
          language,
          loadedLanguages,
          defaultLang,
          logLevel,
          getMarkdownFilePath!,
        ),
        meta: {
          /**
           * Custom `transformers` passed by users may require `attrs`.
           * e.g. [transformerNotationWordHighlight](https://shiki.style/packages/transformers#transformernotationwordhighlight)
           */
          __raw: attrs,
        },
        transformers: [
          ...transformers,
          ...(options.highlightLines ?? true
            ? [transformerCompactLineOptions(attrsToLines(attrs))]
            : []),
          ...userTransformers,
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
