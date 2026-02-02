import type { HighlightLanguage } from './languages.js'
import * as languages from './languages.js'

type LanguageAlias = string

type LanguagesMap = Record<LanguageAlias, HighlightLanguage>

/**
 * A key-value map to get language info from alias
 *
 * - key: alias
 * - value: language
 */
let languagesMap: LanguagesMap | null = null

/**
 * Lazy generate languages map
 */
const getLanguagesMap = (): LanguagesMap =>
  (languagesMap ??= Object.values(languages).reduce<LanguagesMap>(
    (result, item) => ({
      ...result,
      ...Object.fromEntries(item.aliases.map((alias) => [alias, item])),
    }),
    {},
  ))

/**
 * Resolve language for highlight from token info
 *
 * 从代码标记信息中解析高亮语言
 *
 * @param info - Token info string / 代码标记信息字符串
 * @returns Language information / 语言信息
 * @example
 * ```ts
 * import { resolveLanguage } from '@vuepress/plugin-prismjs'
 *
 * const lang = resolveLanguage('js {1,3-5}')
 * console.log(lang.name) // 'javascript'
 * ```
 */
export const resolveLanguage = (info: string): HighlightLanguage => {
  // get user-defined language alias
  const alias = info.match(/^([^ :[{]+)/)?.[1] || 'text'

  // if the alias does not have a match in the map
  // fallback to the alias itself
  return (
    getLanguagesMap()[alias] ?? {
      name: alias,
      ext: alias,
      aliases: [alias],
    }
  )
}
