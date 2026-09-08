import type { MarkdownItContainerOptions } from '@mdit/plugin-container'
import { container } from '@mdit/plugin-container'
import type { PluginSimple } from 'markdown-it'

/**
 * Steps container markdown-it plugin
 *
 * 步骤容器 markdown-it 插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 */
export const steps: PluginSimple = (md) => {
  md.use<MarkdownItContainerOptions>(container, {
    name: 'steps',
    openRenderer: () => '<div class="vp-steps">\n',
    closeRenderer: () => '</div>\n',
  })
}
