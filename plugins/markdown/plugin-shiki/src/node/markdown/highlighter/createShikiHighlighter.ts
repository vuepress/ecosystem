import { createRequire } from 'node:module'
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki'
import { createHighlighter, isSpecialLang } from 'shiki'
import { createSyncFn } from 'synckit'
import type { ShikiResolveLang } from '../../resolveLang.js'
import type { ShikiHighlightOptions } from '../../types.js'
import { resolveLanguage } from '../../utils.js'

const require = createRequire(import.meta.url)

const resolveLangSync = createSyncFn<ShikiResolveLang>(
  require.resolve('@vuepress/plugin-shiki/resolveLang'),
)

export type ShikiLoadLang = (lang: string) => boolean

export const createShikiHighlighter = async ({
  langs = [],
  langAlias = {},
  defaultLang,
  shikiSetup,
  ...options
}: ShikiHighlightOptions = {}): Promise<{
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>
  loadLang: ShikiLoadLang
}> => {
  const highlighter = await createHighlighter({
    langs: [...langs, ...Object.values(langAlias)],
    langAlias,
    themes:
      'themes' in options
        ? Object.values(options.themes)
        : [options.theme ?? 'nord'],
  })

  const loadLang = (lang: string): boolean => {
    if (isSpecialLang(lang)) return true

    const loadedLangs = highlighter.getLoadedLanguages()

    if (!loadedLangs.includes(lang)) {
      const resolvedLang = resolveLangSync(lang)

      if (!resolvedLang.length) return false

      highlighter.loadLanguageSync(resolvedLang)
    }

    return true
  }

  // patch for twoslash - https://github.com/vuejs/vitepress/issues/4334
  const rawGetLanguage = highlighter.getLanguage

  highlighter.getLanguage = (name) => {
    const lang = typeof name === 'string' ? name : name.name

    loadLang(resolveLanguage(lang))

    return rawGetLanguage.call(highlighter, name)
  }

  await shikiSetup?.(highlighter)

  return { highlighter, loadLang }
}
