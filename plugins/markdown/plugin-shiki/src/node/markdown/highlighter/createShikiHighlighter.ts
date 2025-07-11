import { createRequire } from 'node:module'
import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ShikiTransformer,
} from 'shiki'
import { createHighlighter, isSpecialLang } from 'shiki'
import { createSyncFn } from 'synckit'
import type { App } from 'vuepress'
import { isPlainObject } from 'vuepress/shared'
import type { ShikiPluginOptions } from '../../options.js'
import type { ShikiResolveLang } from '../../resolveLang.js'
import { vPreTransformer } from '../../transformers/vuepressTransformers.js'
import { resolveLanguage } from '../../utils.js'

const require = createRequire(import.meta.url)

const resolveLangSync = createSyncFn<ShikiResolveLang>(
  require.resolve('@vuepress/plugin-shiki/resolveLang'),
)

/**
 * Load language function type
 *
 * 加载语言函数类型
 */
export type ShikiLoadLang = (lang: string) => boolean

/**
 * Create Shiki highlighter with additional features
 *
 * 创建带有额外功能的 Shiki 高亮器
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param options - Plugin options / 插件选项
 * @param enableVPre - Whether to enable v-pre transformer / 是否启用 v-pre 转换器
 *
 * @default enableVPre: true
 *
 * @returns Object containing highlighter, loadLang function and extra transformers / 包含高亮器、loadLang 函数和额外转换器的对象
 */
export const createShikiHighlighter = async (
  app: App,
  {
    langs = [],
    langAlias = {},
    defaultLang,
    shikiSetup,
    ...options
  }: ShikiPluginOptions = {},
  enableVPre = true,
): Promise<{
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>
  loadLang: ShikiLoadLang
  extraTransformers: ShikiTransformer[]
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

  const extraTransformers: ShikiTransformer[] = []

  if (enableVPre) extraTransformers.push(vPreTransformer)

  if (options.twoslash) {
    const { createTwoslashTransformer, createFileSystemTypesCache } =
      await import('@vuepress/shiki-twoslash')

    const { typesCache, ...twoslashOptions } = isPlainObject(options.twoslash)
      ? options.twoslash
      : {}
    extraTransformers.push(
      await createTwoslashTransformer({
        ...twoslashOptions,
        typesCache:
          typesCache === true || typeof typesCache === 'undefined'
            ? createFileSystemTypesCache({
                dir: app.dir.cache('markdown/twoslash'),
              })
            : typesCache,
      }),
    )
  }

  await shikiSetup?.(highlighter)

  return { highlighter, loadLang, extraTransformers }
}
