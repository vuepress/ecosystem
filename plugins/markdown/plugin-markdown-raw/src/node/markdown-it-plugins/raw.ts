import type { PluginSimple } from '@mdit/helper'
import { container } from '@mdit/plugin-container'

/**
 * `raw` container support plugin
 *
 * `raw` 容器支持插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 */
export const raw: PluginSimple = (md) => {
  container(md, {
    name: 'raw',
    openRenderer: () => `<div class="vp-raw">\n`,
    closeRenderer: () => '</div>\n',
  })
}
