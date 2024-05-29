import { transformerCompactLineOptions } from '@shikijs/transformers'
import { bundledLanguages, getHighlighter, isSpecialLang } from 'shiki'
import { colors, logger } from 'vuepress/utils'
import { getTransformers } from './transformers/getTransformers.js'
import type { ShikiHighlightOptions } from './types.js'
import { attrsToLines, nanoid, resolveLanguage } from './utils.js'

export { bundledLanguages } from 'shiki'
export const bundledLanguageNames = Object.keys(bundledLanguages)

const MUSTACHE_REG = /\{\{[^]*?\}\}/g

export const resolveHighlight = async ({
  langs = bundledLanguageNames,
  theme = 'nord',
  themes,
  defaultHighlightLang = '',
  transformers: userTransformers = [],
  ...options
}: ShikiHighlightOptions = {}): Promise<
  (str: string, lang: string, attrs: string) => string
> => {
  const highlighter = await getHighlighter({
    langs,
    themes: themes ? [themes.dark, themes.light] : [theme],
  })

  await options.shikiSetup?.(highlighter)

  const transformers = getTransformers(options)
  const loadedLanguages = highlighter.getLoadedLanguages()

  return (str, language, attrs) => {
    let lang = resolveLanguage(language)

    if (lang && !loadedLanguages.includes(lang) && !isSpecialLang(lang)) {
      logger.warn(
        colors.yellow(
          `\nThe language '${lang}' is not loaded, falling back to '${defaultHighlightLang || 'txt'}' for syntax highlighting.`,
        ),
      )
      lang = defaultHighlightLang
    }

    const codeMustaches = new Map<string, string>()

    const removeMustache = (str: string): string =>
      str.replace(MUSTACHE_REG, (match) => {
        let marker = codeMustaches.get(match)

        if (!marker) {
          marker = nanoid()
          codeMustaches.set(match, marker)
        }

        return marker
      })

    const restoreMustache = (str: string): string => {
      codeMustaches.forEach((marker, match) => {
        str = str.replaceAll(marker, match)
      })

      return str
    }

    str = removeMustache(str).trimEnd()

    const highlighted = highlighter.codeToHtml(str, {
      lang,
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
      ...(themes ? { themes, defaultColor: options.defaultColor } : { theme }),
    })

    return restoreMustache(highlighted)
  }
}
