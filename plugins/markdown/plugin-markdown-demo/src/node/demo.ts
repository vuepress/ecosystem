import { container } from '@mdit/plugin-container'
import { encodeData } from '@vuepress/helper'
import type { PluginSimple } from 'markdown-it'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'

const registerVPDemo = (
  md: MarkdownIt,
  name: string,
  demoType: string,
): void => {
  container(md, {
    name,
    openRender: (tokens: Token[], index: number): string => {
      const title = tokens[index].info.trimStart().slice(name.length).trim()

      let config = ''
      const code: Record<string, string> = {}

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i]
        const language = info
          ? (/^([^ :[{]+)/.exec(md.utils.unescapeAll(info).trim())?.[1] ??
            'text')
          : ''

        if (type === `container_${name}_close`) break
        if (!content) continue
        if (type === 'fence')
          if (language === 'json') config = encodeData(content)
          else code[language] = content
      }

      return `<VPDemo id="vp-demo-${index}" type="${demoType}"${
        title ? ` title="${encodeURIComponent(title)}"` : ''
      }${config ? ` config="${config}"` : ''} code="${encodeData(
        JSON.stringify(code),
      )}">\n`
    },
    closeRender: () => `</VPDemo>\n`,
  })
}

export const htmlDemo: PluginSimple = (md) => {
  registerVPDemo(md, 'html-demo', 'html')
}

export const vueDemo: PluginSimple = (md) => {
  registerVPDemo(md, 'vue-demo', 'vue')
}

export const reactDemo: PluginSimple = (md) => {
  registerVPDemo(md, 'react-demo', 'react')
}
