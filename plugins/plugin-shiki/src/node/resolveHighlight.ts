import { transformerCompactLineOptions } from '@shikijs/transformers'
import {
  bundledLanguages,
  getHighlighter,
  isPlainLang,
  isSpecialLang,
} from 'shiki'
import { colors, logger } from 'vuepress/utils'
import { getTransformers } from './transformers/getTransformers.js'
import type { ShikiPluginOptions } from './types.js'
import { attrsToLines, nanoid, resolveLanguage } from './utils.js'

const DEFAULT_LANGS = Object.keys(bundledLanguages)

const MUSTACHE_REG = /\{\{[^]*?\}\}/g

export const resolveHighlight = async ({
  langs = DEFAULT_LANGS,
  theme = 'nord',
  themes,
  defaultHighlightLang = '',
  transformers: userTransformers = [],
  ...options
}: ShikiPluginOptions = {}): Promise<
  (str: string, lang: string, attrs: string) => string
> => {
  const highlighter = await getHighlighter({
    langs,
    themes: themes ? [themes.dark, themes.light] : [theme],
  })

  await options.shikiSetup?.(highlighter)

  const transformers = getTransformers(options)

  return (str, language, attrs) => {
    let lang = resolveLanguage(language)

    if (lang) {
      const langLoaded = highlighter.getLoadedLanguages().includes(lang as any)
      if (!langLoaded && !isPlainLang(lang) && !isSpecialLang(lang)) {
        logger.warn(
          colors.yellow(
            `\nThe language '${lang}' is not loaded, falling back to '${defaultHighlightLang || 'txt'}' for syntax highlighting.`,
          ),
        )
        lang = defaultHighlightLang
      }
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
      meta: { __raw: attrs },
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
