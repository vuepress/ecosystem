import type { PluginSimple } from '@mdit/helper'
import { encodeData } from '@vuepress/helper'
import type { Token } from 'markdown-it'

const markmapRender = (tokens: Token[], index: number): string =>
  `<MarkMap content="${encodeData(tokens[index].content)}"></MarkMap>`

/**
 * Markmap markdown-it plugin
 *
 * Markmap markdown-it 插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 */
export const markmap: PluginSimple = (md) => {
  // Handle ```markmap blocks
  const { fence } = md.renderer.rules

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { info } = tokens[index]
    const [realInfo] = info.split(':', 2)

    if (realInfo === 'markmap') return markmapRender(tokens, index)

    return fence(...args)
  }

  md.renderer.rules.markmap = markmapRender
}
