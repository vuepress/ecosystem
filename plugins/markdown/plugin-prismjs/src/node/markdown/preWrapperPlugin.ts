import type { Markdown } from 'vuepress/markdown'
import { resolveLanguage } from '../utils/index.js'

export interface MarkdownItPreWrapperOptions {
  /**
   * Wrap the `<pre>` tag with an extra `<div>` or not. Do not disable it unless you
   * understand what's it for
   *
   * - Required for line numbers, title display and code block collapsing
   */
  preWrapper?: boolean
}

export const preWrapperPlugin = (
  md: Markdown,
  { preWrapper = true }: MarkdownItPreWrapperOptions = {},
): void => {
  const rawFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    let result = rawFence(...args)

    const [tokens, idx, { langPrefix }] = args
    const token = tokens[idx]

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    // resolve language from token info
    const language = resolveLanguage(info)
    const languageClass = `${langPrefix}${language.name}`

    result = result.replace(/<code[^]*?>/, `<code class="${languageClass}">`)
    if (!preWrapper || !result.startsWith('<pre')) {
      return result
    }

    /**
     * Add information to dataset for current code block.
     */
    return `<div class="${languageClass}" data-highlighter="prismjs" data-ext="${language.ext}">${result.replace(` class="${languageClass}"`, '')}</div>`
  }
}
