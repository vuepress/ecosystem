import { colors } from 'vuepress/utils'
import type { ShikiHighlightOptions } from '../../types.js'
import { logger, resolveLanguage } from '../../utils.js'
import type { MarkdownFilePathGetter } from './createMarkdownFilePathGetter.js'
import type { ShikiLoadLang } from './createShikiHighlighter.js'

const WARNED_LANGS = new Set<string>()

export const getLanguage = (
  lang: string,
  { defaultLang, logLevel }: ShikiHighlightOptions,
  loadLang: ShikiLoadLang,
  markdownFilePathGetter: MarkdownFilePathGetter,
): string => {
  let result = resolveLanguage(lang)

  if (result && !loadLang(result)) {
    // warn for unknown languages only once
    if (logLevel !== 'silent' && !WARNED_LANGS.has(result)) {
      logger.warn(
        `Missing ${colors.cyan(lang)} highlighter, ${defaultLang ? `use ${colors.cyan(defaultLang)} to highlight instead.` : 'skip highlighting'}`,
      )
      WARNED_LANGS.add(result)
    }

    // log file path if unknown language is found
    if (logLevel === 'debug') {
      logger.info(
        `Unknown language ${colors.cyan(result)} found in ${colors.cyan(markdownFilePathGetter())}`,
      )
    }

    result = defaultLang || 'plain'
  }

  return result
}
