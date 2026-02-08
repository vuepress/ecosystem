import type { MarkdownItUMLOptions } from '@mdit/plugin-uml'
import { uml } from '@mdit/plugin-uml'
import { encodeData } from '@vuepress/helper'
import type { PluginSimple } from 'markdown-it'

/**
 * Markdown-it plugin for reveal.js presentation
 *
 * 用于 reveal.js 演示的 markdown-it 插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 */
export const revealJs: PluginSimple = (md) => {
  md.use<MarkdownItUMLOptions>(uml, {
    name: 'revealjs',
    open: 'slidestart',
    close: 'slideend',
    render: (tokens, index) => {
      const token = tokens[index]
      const { content, info } = token

      return `<RevealJs code="${encodeData(content)}" theme="${
        info.trim() || 'auto'
      }"></RevealJs>`
    },
  })
}
