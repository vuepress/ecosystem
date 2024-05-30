import { transformerCompactLineOptions } from '@shikijs/transformers'
import type MarkdownIt from 'markdown-it'
import { bundledLanguages, getHighlighter, isSpecialLang } from 'shiki'
import type { App } from 'vuepress'
import type { MarkdownEnv } from 'vuepress/markdown'
import { colors } from 'vuepress/utils'
import { getTransformers } from '../transformers/getTransformers.js'
import type { ShikiHighlightOptions } from '../types.js'
import { attrsToLines, logger, resolveLanguage } from '../utils.js'
import { handleMustache } from './handleMustache.js'

export { bundledLanguages } from 'shiki'
export const bundledLanguageNames = Object.keys(bundledLanguages)

const WARNED_LANGS = new Set<string>()

type MarkdownFilePathGetter = () => string

const createMarkdownFilePathGetter = (
  md: MarkdownIt,
): MarkdownFilePathGetter => {
  const store: { path?: string | null } = {}

  const rawRender = md.render

  // we need to store file path before each render
  md.render = (src, env: MarkdownEnv) => {
    store.path = env.filePathRelative

    return rawRender(src, env)
  }

  return () => store.path || 'dynamic pages'
}

const getLanguage = (
  lang: string,
  loadedLanguages: string[],
  defaultLang: string,
  logLevel: string,
  getMarkdownFilePath: MarkdownFilePathGetter,
): string => {
  let result = resolveLanguage(lang)

  if (result && !loadedLanguages.includes(result) && !isSpecialLang(result)) {
    // warn for unknown languages only once
    if (logLevel !== 'silent' && !WARNED_LANGS.has(result)) {
      logger.warn(
        `Missing ${colors.cyan(lang)} highlighter, use ${colors.cyan(defaultLang)} to highlight instead.`,
      )
      WARNED_LANGS.add(result)
    }

    // log file path if unknown language is found
    if (logLevel === 'debug') {
      logger.info(
        `Unknown language ${colors.cyan(result)} found in ${colors.cyan(getMarkdownFilePath())}`,
      )
    }

    result = defaultLang
  }

  return result
}

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

  md.options.highlight = (str, language, attrs) => {
    const highlightCode = (str: string): string =>
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
      })

    return handleMustache(str, highlightCode)
  }
}
