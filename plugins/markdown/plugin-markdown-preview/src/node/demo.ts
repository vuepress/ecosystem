import type { MarkdownItDemoOptions } from '@mdit/plugin-demo'
import { demo } from '@mdit/plugin-demo'
import type { PluginSimple } from 'markdown-it'

import { escapeHtml } from './utils.js'

export const preview: PluginSimple = (md) => {
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
    name: 'preview',
    ...demoOptions,
  })
}
