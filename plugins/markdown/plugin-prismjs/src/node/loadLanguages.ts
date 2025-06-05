import Prism from 'prismjs'
import rawLoadLanguages from 'prismjs/components/index.js'

// prevent warning messages
rawLoadLanguages.silent = true

/**
 * Load prism languages
 *
 * 加载 prism 语言
 *
 * @param languages - Languages to load / 要加载的语言
 * @example
 * ```ts
 * loadLanguages(['javascript', 'typescript', 'python'])
 * ```
 */
export const loadLanguages = (languages: string[]): void => {
  const langsToLoad = languages.filter((item) => !(item in Prism.languages))

  if (langsToLoad.length) {
    rawLoadLanguages(langsToLoad)
  }
}
