import { createRequire } from 'node:module'
import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  LanguageRegistration,
} from 'shiki'
import { createHighlighter, isSpecialLang } from 'shiki'
import { createSyncFn } from 'synckit'
import type { ShikiResolveLang } from '../../resolveLang.js'
import type { ShikiHighlightOptions } from '../../types.js'

const require = createRequire(import.meta.url)

const resolveLangSync = createSyncFn<ShikiResolveLang>(
  require.resolve('@vuepress/plugin-shiki/resolveLang'),
)

export type ShikiLoadLang = (lang: LanguageRegistration | string) => boolean

export const createShikiHighlighter = async ({
  langs = [],
  langAlias = {},
  defaultLang,
  shikiSetup,
  ...options
}: ShikiHighlightOptions = {}): Promise<{
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>
  loadLang: (lang: LanguageRegistration | string) => boolean
}> => {
  const highlighter = await createHighlighter({
    langs: [...langs, ...Object.values(langAlias)],
    langAlias,
    themes:
      'themes' in options
        ? Object.values(options.themes)
        : [options.theme ?? 'nord'],
  })

  const loadLang = (langConfig: LanguageRegistration | string): boolean => {
    const lang = typeof langConfig === 'string' ? langConfig : langConfig.name

    if (
      !isSpecialLang(lang) &&
      !highlighter.getLoadedLanguages().includes(lang)
    ) {
      const resolvedLang = resolveLangSync(lang)

      if (!resolvedLang.length) return false

      console.log('loading lang', lang)

      highlighter.loadLanguageSync(resolvedLang)
    }
    return true
  }

  // patch for twoslash - https://github.com/vuejs/vitepress/issues/4334
  const rawGetLanguage = highlighter.getLanguage

  highlighter.getLanguage = (name) => {
    loadLang(name)

    return rawGetLanguage.call(highlighter, name)
  }

  await shikiSetup?.(highlighter)

  return { highlighter, loadLang }
}
