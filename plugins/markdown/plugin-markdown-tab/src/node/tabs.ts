import { tab } from '@mdit/plugin-tab'
import type { PluginSimple } from 'markdown-it'

import { stringifyProp } from './utils.js'

export const tabs: PluginSimple = (md) => {
  tab(md, {
    name: 'tabs',

    tabsOpenRenderer: ({ active, data }, tokens, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { meta } = tokens[index]
      const titles = data.map(({ title }) => md.renderInline(title))
      const tabsData = data.map((item, dataIndex) => {
        const { id = titles[dataIndex] } = item

        return { id }
      })

      return `\
<Tabs id="${index}" :data='${stringifyProp(tabsData)}'${
        active === -1 ? '' : ` :active="${active}"`
      }${
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        meta.id ? ` tab-id="${meta.id as string}"` : ''
      }>
${titles
  .map(
    (title, titleIndex) => `\
<template #title${titleIndex}="{ value, isActive }">${title}</template>
`,
  )
  .join('')}\
`
    },

    tabsCloseRenderer: () => `\
</Tabs>
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
