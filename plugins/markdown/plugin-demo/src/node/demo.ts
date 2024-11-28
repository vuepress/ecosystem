import { container } from '@mdit/plugin-container'
import type { MarkdownItDemoOptions } from '@mdit/plugin-demo'
import { demo } from '@mdit/plugin-demo'
import { encodeData } from '@vuepress/helper'
import type { PluginSimple } from 'markdown-it'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import { escapeHtml } from './utils.js'

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

export const markdownDemo: PluginSimple = (md) => {
  const demoOptions: MarkdownItDemoOptions = {
    openRender: (tokens, index) =>
      `<MdDemo title="${escapeHtml(
        tokens[index].info,
      )}" id="md-demo-${index}">\n`,
    codeRender: (tokens, index, options, _env, self) => {
      const token = tokens[index]

      token.type = 'fence'
      token.info = 'md'
      token.markup = '```'
      // Handle include rule
      token.content = token.content
        .split('\n')
        .filter(
          (item) =>
            !item.startsWith('@') || !/^@include-p(?:ush\(.*\)|op)$/.test(item),
        )
        .join('\n')

      return `<template #code>\n${self.rules.fence!(
        tokens,
        index,
        options,
        _env,
        self,
      )}</template>\n`
    },
    contentOpenRender: () => `<template #default>\n`,
    contentCloseRender: () => `</template>\n`,
    closeRender: () => '</MdDemo>\n',
  }

  md.use(demo, {
    name: 'md-demo',
    ...demoOptions,
  })
  md.use(demo, {
    name: 'markdown-demo',
    ...demoOptions,
  })
}

export const normalDemo: PluginSimple = (md) => {
  registerVPDemo(md, 'demo', 'normal')
  registerVPDemo(md, 'normal-demo', 'normal')
}

export const vueDemo: PluginSimple = (md) => {
  registerVPDemo(md, 'vue-demo', 'vue')
}

export const reactDemo: PluginSimple = (md) => {
  registerVPDemo(md, 'react-demo', 'react')
}
