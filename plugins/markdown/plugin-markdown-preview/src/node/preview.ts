import { escapeHtml } from '@mdit/helper'
import type { MarkdownItDemoOptions } from '@mdit/plugin-demo'
import { demo } from '@mdit/plugin-demo'
import type { PluginSimple } from 'markdown-it'

export const preview: PluginSimple = (md) => {
  const demoOptions: MarkdownItDemoOptions = {
    openRender: (tokens, index) =>
      `<VPPreview title="${escapeHtml(tokens[index].info)}">\n`,
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

      return `\
<template #code>
${self.rules.fence!(tokens, index, options, _env, self)}
</template>
`
    },
    contentOpenRender: () => `<template #content>\n`,
    contentCloseRender: () => `</template>\n`,
    closeRender: () => '</VPPreview>\n',
  }

  md.use(demo, {
    name: 'preview',
    ...demoOptions,
  })
}
