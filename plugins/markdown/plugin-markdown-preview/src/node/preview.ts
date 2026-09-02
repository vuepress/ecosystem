import { escapeHtml } from '@mdit/helper'
import type { MarkdownItDemoOptions } from '@mdit/plugin-demo'
import { demo } from '@mdit/plugin-demo'
import type { PluginSimple } from 'markdown-it'

export const preview: PluginSimple = (md) => {
  const demoOptions: MarkdownItDemoOptions = {
    openRenderer: (tokens, index) =>
      `<VPPreview title="${escapeHtml(tokens[index].info)}">\n`,
    codeRenderer: (tokens, index, options, _env, self) =>
      `\
<template #code>
${self.rules.fence!(tokens, index, options, _env, self)}
</template>
`,
    contentOpenRenderer: () => `<template #content>\n`,
    contentCloseRenderer: () => `</template>\n`,
    closeRenderer: () => '</VPPreview>\n',
  }

  md.use(demo, {
    name: 'preview',
    ...demoOptions,
  })
}
