import type { MarkdownItUMLOptions } from '@mdit/plugin-uml'
import { uml } from '@mdit/plugin-uml'
import { encodeData } from '@vuepress/helper'
import type { PluginSimple } from 'markdown-it'

export const revealJs: PluginSimple = (md) => {
  md.use<MarkdownItUMLOptions>(uml, {
    name: 'revealjs',
    open: 'slidestart',
    close: 'slideend',
    render: (tokens, index) => {
      const token = tokens[index]
      const key = `revealjs-${index}`
      const { content, info } = token

      return `<RevealJs id="${key}" code="${encodeData(content)}" theme="${
        info.trim() || 'auto'
      }"></RevealJs>`
    },
  })
}
