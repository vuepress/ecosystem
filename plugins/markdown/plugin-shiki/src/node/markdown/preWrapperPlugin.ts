// markdown-it plugin for generating line numbers.
// v-pre block logic is in `../highlight.ts`
import type { Markdown } from 'vuepress/markdown'
import { resolveLanguage } from '../utils.js'

const PRE_ATTRS_REGEXP = /<pre([\s\S]*?)style="([^"]*)"([^>]*)>/

export interface MarkdownItPreWrapperOptions {
  /**
   * Wrap the `<pre>` tag with an extra `<div>` or not. Do not disable it unless you
   * understand what's it for
   *
   * - Required for line numbers, title display and code block collapsing
   */
  preWrapper?: boolean
}

/**
 * A markdown-it plugin for wrapping `<pre>` tag with an extra `<div>`
 *
 * 一个用于为 `<pre>` 标签添加额外 `<div>` 包装的 markdown-it 插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param options - Plugin options / 插件选项
 *
 * @default { preWrapper: true }
 */
export const preWrapperPlugin = (
  md: Markdown,
  { preWrapper = true }: MarkdownItPreWrapperOptions = {},
): void => {
  const rawFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    let result = rawFence(...args)

    if (!result.startsWith('<pre')) {
      return result
    }

    const [tokens, idx, options] = args
    const token = tokens[idx]

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''

    const lang = resolveLanguage(info)
    const languageClass = `${options.langPrefix}${lang}`

    result = result.replace(/<code[^]*?>/, `<code class="${languageClass}">`)
    if (!preWrapper) {
      result = `<pre class="${languageClass} ${result.slice('<pre class="'.length)}`
      return result
    }
    let styles = ''

    // before: maybe `v-pre class="shiki *"`
    // after: style="*" tab-index="*"
    result = result.replace(
      PRE_ATTRS_REGEXP,
      (_, before: string, style: string, after: string) => {
        styles = style.trim()
        // Keep `v-pre class="*"`, remove the rest.
        return `<pre ${before.trim()}${after.trimEnd()}>`
      },
    )

    /**
     * Add information to dataset for current code block.
     */
    return `<div class="${languageClass}" data-highlighter="shiki" data-ext="${lang}" style="${styles}">${result}</div>`
  }
}
