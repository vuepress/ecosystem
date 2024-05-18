import type { Markdown } from 'vuepress/markdown'
import type { PreWrapperOptions } from '../types.js'
import { resolveAttr, resolveLanguage, resolveVPre } from '../utils/index.js'

export const preWrapperPlugin = (
  md: Markdown,
  {
    preWrapper = true,
    vPre: { block: vPreBlock = true } = {},
  }: PreWrapperOptions = {},
): void => {
  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, { langPrefix }] = args
    const token = tokens[idx]

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    // resolve language from token info
    const language = resolveLanguage(info)
    const languageClass = `${langPrefix}${language.name}`

    let result = fence(...args)

    if (resolveVPre(info) ?? vPreBlock) {
      result = `<pre v-pre${result.slice('<pre'.length)}`
    }

    if (!preWrapper) {
      return result
    }

    // resolve title from token info
    const title = resolveAttr(info, 'title') ?? language.ext

    return `<div class="${languageClass}" data-ext="${language.ext}" data-title="${title}">${result}</div>`
  }
}
