import type { Markdown } from 'vuepress/markdown'
import { resolveLanguage } from '../utils/index.js'

export interface MarkdownItPreWrapperOptions {
  /**
   * Wrap the `<pre>` tag with an extra `<div>` or not. Do not disable it unless you
   * understand what's it for
   *
   * - Required for line numbers, title display and code block collapsing
   *
   * 是否用额外的 `<div>` 包装 `<pre>` 标签。除非你了解它的作用，否则不要禁用它
   *
   * - 行号、标题显示和代码块折叠所必需
   */
  preWrapper?: boolean
}

/**
 * Markdown-it plugin for pre wrapper
 *
 * 用于 pre 包装器的 markdown-it 插件
 *
 * @param md - Markdown instance / Markdown 实例
 * @param options - Plugin options / 插件选项
 * @example
 * ```ts
 * import { preWrapperPlugin } from '@vuepress/plugin-prismjs'
 * import MarkdownIt from 'markdown-it'
 *
 * const md = new MarkdownIt()
 * md.use(preWrapperPlugin, { preWrapper: true })
 * ```
 */
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
