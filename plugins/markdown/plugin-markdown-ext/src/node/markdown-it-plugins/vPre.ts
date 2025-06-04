import { container } from '@mdit/plugin-container'
import type { PluginSimple } from 'markdown-it'

/**
 * v-pre container support plugin
 *
 * v-pre 容器支持插件
 */
export const vPre: PluginSimple = (md) => {
  container(md, {
    name: 'v-pre',
    openRender: () => `<div v-pre>\n`,
    closeRender: () => '</div>\n',
  })
}
