// markdown-it plugin for generating line numbers.
// v-pre block logic is in `../highlight.ts`
import type { Markdown } from 'vuepress/markdown'
import type { PreWrapperOptions } from '../types.js'
import { resolveAttr, resolveLanguage } from '../utils.js'

export const preWrapperPlugin = (
  md: Markdown,
  { preWrapper = true }: PreWrapperOptions = {},
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

    if (!preWrapper) {
      /**
       * remove `<code>` attributes
       *
       * In the source code of `markdown-it fence line 71, line 74`,
       * `fence` writes `class="language-*"` onto the `code` element,
       * whereas in past versions, `vuepress` wrote it on the `pre` element.
       * Therefore, this behavior needs to be reset.
       *
       * Even though `shiki` directly returns the contents within `<pre>`
       * at `line 48` of `markdown-it`, I believe it is still prudent to make this adjustment.
       *
       * @see https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs
       */
      result = result.replace(/<code[^]*?>/, '<code>')
      result = `<pre class="${languageClass}"${result.slice('<pre'.length)}`
      return result
    }

    const title = resolveAttr(info, 'title') || lang

    return `<div class="${languageClass}" data-ext="${lang}" data-title="${title}">${result}</div>`
  }
}
