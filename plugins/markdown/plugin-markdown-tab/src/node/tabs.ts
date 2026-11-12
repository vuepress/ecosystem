import type { PluginSimple } from '@mdit/helper'
import { tab } from '@mdit/plugin-tab'

import { stringifyProp } from './utils.js'

/**
 * Markdown-it plugin for tabs
 *
 * 用于选项卡的 Markdown-it 插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 */
export const tabs: PluginSimple = (md) => {
  tab(md, {
    name: 'tabs',

    openRenderer: ({ active, data }, tokens, index) => {
      const meta = tokens[index].meta ?? {}
      const titles = data.map(({ title }) => md.renderInline(title))
      const tabsData = data.map((item, dataIndex) => {
        const { id = titles[dataIndex] } = item

        return { id }
      })

      return `\
<VPTabs :data='${stringifyProp(tabsData)}'${
        active === -1 ? '' : ` :active="${active}"`
      }${meta.id ? ` tab-id="${meta.id as string}"` : ''}>
${titles
  .map(
    (title, titleIndex) => `\
<template #title${titleIndex}="{ value, isActive }">${title}</template>
`,
  )
  .join('')}\
`
    },

    closeRenderer: () => `\
</VPTabs>
`,

    tabOpenRenderer: ({ index }) =>
      `\
<template #tab${index}="{ value, isActive }">
`,

    tabCloseRenderer: () => `\
</template>
`,
  })
}
