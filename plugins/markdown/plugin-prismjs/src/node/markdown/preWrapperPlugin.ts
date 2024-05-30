import type { Markdown } from 'vuepress/markdown'
import type { PreWrapperOptions } from '../types.js'
import { resolveAttr, resolveLanguage } from '../utils/index.js'

export const preWrapperPlugin = (
  md: Markdown,
  { preWrapper = true }: PreWrapperOptions = {},
): void => {
  const rawFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const result = rawFence(...args)

    if (!preWrapper || !result.startsWith('<pre')) {
      return result
    }

    const [tokens, idx, { langPrefix }] = args
    const token = tokens[idx]

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    // resolve language from token info
    const language = resolveLanguage(info)
    const languageClass = `${langPrefix}${language.name}`

    // resolve title from token info
    const title = resolveAttr(info, 'title') ?? language.ext

    /**
     * Add information to dataset for current code block.
     */
    return `<div class="${languageClass}" data-highlighter="prismjs" data-ext="${language.ext}" data-title="${title}">${result}</div>`
  }
}
