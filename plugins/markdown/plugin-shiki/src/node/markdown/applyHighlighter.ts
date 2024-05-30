import { transformerCompactLineOptions } from '@shikijs/transformers'
import type MarkdownIt from 'markdown-it'
import { bundledLanguages, getHighlighter, isSpecialLang } from 'shiki'
import type { App } from 'vuepress'
import type { MarkdownEnv } from 'vuepress/markdown'
import { colors } from 'vuepress/utils'
import { getTransformers } from '../transformers/getTransformers.js'
import type { ShikiHighlightOptions } from '../types.js'
import { attrsToLines, logger, nanoid, resolveLanguage } from '../utils.js'

export { bundledLanguages } from 'shiki'
export const bundledLanguageNames = Object.keys(bundledLanguages)

const MUSTACHE_REG = /\{\{[^]*?\}\}/g

const WARNED_LANGS = new Set<string>()

export const applyHighlighter = async (
  md: MarkdownIt,
  app: App,
  {
    langs = bundledLanguageNames,
    langAlias = {},
    defaultLang = '',
    transformers: userTransformers = [],
    ...options
  }: ShikiHighlightOptions = {},
): Promise<void> => {
  const logLevel = options.logLevel ?? (app.env.isDebug ? 'debug' : 'warn')
  const store: { path?: string | null } = {}

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

  // we need to store file path before each render
  if (logLevel === 'debug') {
    const rawRender = md.render

    md.render = (src, env: MarkdownEnv) => {
      store.path = env.filePathRelative

      return rawRender(src, env)
    }
  }

  md.options.highlight = (str, language, attrs) => {
    let lang = resolveLanguage(language)

    if (lang && !loadedLanguages.includes(lang) && !isSpecialLang(lang)) {
      // warn for unknown languages only once
      if (logLevel !== 'silent' && !WARNED_LANGS.has(lang)) {
        logger.warn(
          `Missing ${colors.cyan(lang)} highlighter, use ${colors.cyan(defaultLang || 'plain')} to highlight instead.`,
        )
        WARNED_LANGS.add(lang)
      }

      // log file path if unknown language is found
      if (logLevel === 'debug') {
        logger.info(
          `Unknown language ${colors.cyan(lang)} found in ${colors.cyan(store.path || 'dynamic pages')}`,
        )
      }

      lang = defaultLang
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
      ...('themes' in options
        ? {
            themes: options.themes,
            defaultColor: false,
          }
        : { theme: options.theme ?? 'nord' }),
    })

    return restoreMustache(highlighted)
  }
}
