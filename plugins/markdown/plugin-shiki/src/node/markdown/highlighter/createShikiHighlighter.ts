import { createRequire } from 'node:module'
import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ShikiTransformer,
} from 'shiki'
import { createHighlighter, isSpecialLang } from 'shiki'
import { createSyncFn } from 'synckit'
import { isPlainObject } from 'vuepress/shared'
import type { ShikiPluginOptions } from '../../options.js'
import type { ShikiResolveLang } from '../../resolveLang.js'
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
}: ShikiPluginOptions = {}): Promise<{
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>
  loadLang: ShikiLoadLang
  transformerTwoslash: ShikiTransformer | null
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

  let transformerTwoslash: ShikiTransformer | null = null

  if (options.twoslash) {
    const { transformerTwoslash: transformer } = await import(
      '@vuepress/shiki-twoslash'
    )

    transformerTwoslash = await transformer({
      twoslashOptions: isPlainObject(options.twoslash) ? options.twoslash : {},
    })

    await shikiSetup?.(highlighter)
  }

  return { highlighter, loadLang, transformerTwoslash }
}
